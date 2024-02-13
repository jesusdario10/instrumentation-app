import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateDataByQuotationDto } from './dto/create-data-by-quotation.dto';

import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation, ServiceQuotation } from './entities/quotation.entity';
import { Solution } from '../solutions/entities/solution.entity';
import { join } from 'path';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<Quotation>,
    @InjectModel(Solution.name) private solutionModel: Model<Solution>,
    private readonly mailerService: MailerService,
  ) {}

  async create(
    createDataByQuotationDto: CreateDataByQuotationDto,
  ): Promise<any> {
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
        throw new InternalServerErrorException('Consecutive is already exist');
      } else {
        throw error;
      }
    }
  }

  async sendEmail(quotation: Quotation) {
    let servicesRows = '';
    for (const service of quotation.services) {
      servicesRows += `
        <tr style="border-bottom: 0.5px solid white !important;">
          <td style="text-align: justify; color:white; border-bottom: 0.5px solid white;">${service.scope}</td>
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

    const emailHtml = `
      <html>
        <head>
          <style>
            .contenedor {
              background: #7283a7;
              width: 600px;
              min-height: 600px;   
              margin: 0px !important;
              padding:0px !important;
              font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            }
            .contenido1 {
              color: white;
              text-align: center;
              padding-top: 10px;
            }
            .numero {
              font-size: 2rem;
              background: red;
              width: 100px;
              border-radius: 15px;
              padding-left: 25px;
              color: white;
              margin-left: 41px;
            }
            /* Más estilos ... */
            table {
              width: 100%;
              margin-left: auto;
              margin-right: auto;
            }
            th, td {
              text-align: left;
              padding: 8px;
            }
            .footer {
              text-align: center;
              color: white;
              padding-top: 50px;
            }
          </style>
        </head>
        <body>
          <div class="contenedor">
            <img src="cid:header" style="width: 100%; height: auto;" />
            <div class="contenido1">
              <h1>SU NÚMERO DE COTIZACIÓN ES: ${quotation.consecutive}</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Unidad</th>
                  <th>V/Unitario</th>
                </tr>
              </thead>
              <tbody>
                ${servicesRows}
              </tbody>
            </table>
            <div class="footer">
              <p>VALOR TOTAL: ${totalFormatted}</p>
              <p>TIEMPO DE EJECUCIÓN: ${totalTimeFormatted} horas</p>
              <p>Para autorizar su pedido envíe su aprobación a: presupuesto@cdisa.co</p>
              <h2>¡Gracias por confiar en nosotros!</h2>
            </div>
          </div>   
        </body>
      </html>
    `;

    try {
      const imagePath = join(process.cwd(), 'public/mail/fondo2.png');

      await this.mailerService.sendMail({
        from: process.env.USERSMTP,
        to: quotation.email,
        subject: `Confirmación de Cotización #${quotation.consecutive}`,
        html: emailHtml,
        attachments: [
          {
            filename: 'fondo2.png',
            path: imagePath,
            cid: 'header',
          },
        ],
      });
    } catch (error) {
      console.log(error);
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
}
