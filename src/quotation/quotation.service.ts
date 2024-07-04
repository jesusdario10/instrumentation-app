import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { CreateDataByQuotationDto } from './dto/create-data-by-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation, ServiceQuotation } from './entities/quotation.entity';
import { Solution } from '../solutions/entities/solution.entity';
import { LaboratoryRecord } from '../laboratory-records/entities/laboratory-record.entity';
import { PdfService } from './pdf.service';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<Quotation>,
    @InjectModel(Solution.name) private solutionModel: Model<Solution>,
    @InjectModel(LaboratoryRecord.name)
    private laboratoryRegisterModel: Model<LaboratoryRecord>,
    private readonly mailerService: MailerService,
    private readonly pdfService: PdfService,
  ) {}

  async create(
    createDataByQuotationDto: CreateDataByQuotationDto,
  ): Promise<any> {
    const { type } = createDataByQuotationDto;

    if (type === 'valves') {
      return await this.createQuotationByValves(createDataByQuotationDto);
    } else {
      return await this.createQuotationByVaLaboratory(createDataByQuotationDto);
    }
  }

  async sendEmail(quotation: Quotation) {
    const emailContent = this.buildEmailContent(quotation, false);
    const emailHtml = this.buildEmailContent(quotation, true);

    try {
      const pdfBuffer = await this.pdfService.generatePdf(emailContent);
      const imagePath = join(process.cwd(), 'public/mail/fondo2.png');

      await this.mailerService.sendMail({
        from: process.env.USERSMTP,
        to: quotation.email,
        subject: `Confirmación de Cotización #${quotation.consecutive}`,
        html: emailHtml,
        attachments: [
          {
            filename: `file${quotation.consecutive}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
          {
            filename: 'fondo2.png',
            path: imagePath,
            cid: 'header',
          },
        ],
        bcc: 'presupuesto@cdisa.co',
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred in sending the quote',
      );
    }
  }

  async findAll(): Promise<Quotation[]> {
    return this.quotationModel.find().exec();
  }

  async findOne(consecutive: string): Promise<Quotation> {
    const quotation = await this.quotationModel
      .findOne({ consecutive: +consecutive })
      .exec();
    if (!quotation) {
      this.throwQuotationNotFoundException();
    }
    return quotation;
  }

  async update(
    consecutive: string,
    updateQuotationDto: UpdateQuotationDto,
  ): Promise<Quotation> {
    const updatedQuotation = await this.quotationModel
      .findOneAndUpdate({ consecutive: +consecutive }, updateQuotationDto, {
        new: true,
      })
      .exec();

    if (!updatedQuotation) {
      this.throwQuotationNotFoundException();
    }

    return updatedQuotation;
  }

  async remove(consecutive: string): Promise<any> {
    const result = await this.quotationModel
      .deleteOne({ consecutive: +consecutive })
      .exec();
    if (result.deletedCount === 0) {
      this.throwQuotationNotFoundException();
    }
    return result;
  }

  private throwQuotationNotFoundException() {
    throw new NotFoundException('Quotation not found');
  }

  private async createQuotationByValves(
    createDataByQuotationDto: CreateDataByQuotationDto,
  ) {
    const lastQuotation = await this.quotationModel
      .findOne()
      .sort({ consecutive: -1 })
      .limit(1)
      .exec();
    const consecutive = lastQuotation ? lastQuotation.consecutive + 1 : 1;

    let totalPrice = 0;
    let totalTime = 0;

    const solutions: ServiceQuotation[] = [];

    for (const service of createDataByQuotationDto.services) {
      const solution = await this.solutionModel.findById(service._id).exec();
      if (!solution) {
        throw new NotFoundException(
          `Solution with ID ${service._id} not found`,
        );
      }

      solutions.push({
        type: solution.type,
        scope: solution.scope,
        notes: solution.notes,
        hours: solution.totalHours,
        price: solution.unitValue,
        units: service.inputValue,
      });
      totalPrice += service.inputValue * solution.unitValue;
      totalTime += service.inputValue * solution.totalHours;
    }

    const createdQuotation = new this.quotationModel({
      nit: createDataByQuotationDto.nit,
      legalName: createDataByQuotationDto.legalName,
      phoneNumber: createDataByQuotationDto.phoneNumber,
      email: createDataByQuotationDto.email,
      consecutive,
      totalPrice,
      executionTime: totalTime,
      services: solutions,
    });

    try {
      const quotation = await createdQuotation.save();

      await this.sendEmail(quotation);

      return quotation;
    } catch (error) {
      if (error.code === 11000) {
        throw new InternalServerErrorException('Consecutive already exists');
      } else {
        throw error;
      }
    }
  }

  private async createQuotationByVaLaboratory(
    createDataByQuotationDto: CreateDataByQuotationDto,
  ) {
    const lastQuotation = await this.quotationModel
      .findOne()
      .sort({ consecutive: -1 })
      .limit(1)
      .exec();
    const consecutive = lastQuotation ? lastQuotation.consecutive + 1 : 1;

    let totalPrice = 0;
    let totalTime = 0;

    const solutions: ServiceQuotation[] = [];

    for (const service of createDataByQuotationDto.services) {
      const solution = await this.laboratoryRegisterModel
        .findById(service._id)
        .exec();
      if (!solution) {
        throw new NotFoundException(
          `Solution with ID ${service._id} not found`,
        );
      }

      solutions.push({
        type: solution.type,
        scope: solution.scope,
        hours: solution.totalHours,
        price: solution.unitValue,
        units: service.inputValue,
      });
      totalPrice += service.inputValue * solution.unitValue;
      totalTime += service.inputValue * solution.totalHours;
    }

    const createdQuotation = new this.quotationModel({
      nit: createDataByQuotationDto.nit,
      legalName: createDataByQuotationDto.legalName,
      phoneNumber: createDataByQuotationDto.phoneNumber,
      email: createDataByQuotationDto.email,
      consecutive,
      totalPrice,
      executionTime: totalTime,
      services: solutions,
    });

    try {
      const quotation = await createdQuotation.save();

      await this.sendEmail(quotation);

      return quotation;
    } catch (error) {
      if (error.code === 11000) {
        throw new InternalServerErrorException('Consecutive already exists');
      } else {
        throw error;
      }
    }
  }

  private buildEmailContent(quotation: Quotation, isHtmlEmail: boolean) {
    let servicesRows = '';
    for (const service of quotation.services) {
      servicesRows += `
        <tr style="border-bottom: 0.5px solid white !important;">
          <td style="text-align: justify; color:white; border-bottom: 0.5px solid white;">
            Alcance mantenimiento ${service.scope} ${service.notes ? `<br> Notas: ${service.notes}` : ''}
          </td>
          <td style="text-align: center; color:white; border-bottom: 0.5px solid white;">${service.units}</td>
          <td style="text-align: center; color:white; border-bottom: 0.5px solid white;">$${service.price.toLocaleString()}</td>
        </tr>
      `;
    }

    const totalFormatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(quotation.totalPrice);

    const totalTimeFormatted = quotation.executionTime.toFixed(2);

    const headerImage = isHtmlEmail
      ? '<img src="cid:header" style="width: 100%; height: 170px;" />'
      : '<img src="https://www.dropbox.com/scl/fi/j8w7kpb8l30avlykhhe6i/fondo2.png?rlkey=xo7k602giyh510i9wf8uvk39y&st=4j1rd2je&raw=1" style="width: 100%; height: 170px;" />';

    return `
      <html>
        <head>
          <style>
            @page {
              size: auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #7283a7;
              font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            }
            .container {
              width: 8.17in;
              box-sizing: border-box;
              background: #7283a7;
              color: white;
              text-align: center;
              margin: 0;
              padding: 0;
            }
            .sici {}
            .content {
              padding-top: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .consecutive {
              font-size: 2rem;
              background: red;
              width: 100px;
              border-radius: 15px;
              padding-left: 5px;
              color: white;
            }
            table {
              width: 100%;
              margin-left: auto;
              margin-right: auto;
            }
            th, td {
              text-align: left;
              padding: 8px;
              color: white;
            }
            .text-center {
              text-align: center !important;
            }
            .footer {
              color: white;
              padding-top: 20px;
            }
            .totalValueText, .executionTime {
              font-size: 28.8px;
              font-family: bold;
              text-align: center;
            }
            .executionTime {
              text-align: left;
              font-size: 20.8px;
            }
            .totalValue {
              margin-left: 10px;
              border: 2px solid red;
              padding: 10px;
              display: inline;
              border-radius: 15px;
              color: white;
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${headerImage}
            <div class="sici">
              <div class="content">
                <h3 style="padding-right: 1rem;">SU NÚMERO DE COTIZACIÓN ES: </h3>
                <span class="consecutive">0${quotation.consecutive}</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th class="text-center">Descripción</th>
                    <th>Unidad</th>
                    <th>V/Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  ${servicesRows}
                </tbody>
              </table>
              <div class="footer">
                <p class="totalValueText">VALOR TOTAL: <span class="totalValue">${totalFormatted}</span></p>
                <p class="executionTime">TIEMPO DE EJECUCIÓN: ${totalTimeFormatted} horas</p>
                <p>Para conocer más de su solicitud contacte a: presupuesto@cdisa.co</p>
                <h2 class="text-center">¡Gracias por confiar en nosotros!</h2>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
