import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdf(htmlContent: string): Promise<Buffer> {
    let browser: puppeteer.Browser | null = null;
    try {
      const executablePath = puppeteer.executablePath();
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath,
      });
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const bodyHandle = await page.$('body');
      const boundingBox = await bodyHandle.boundingBox();

      await page.setViewport({
        width: Math.ceil(boundingBox.width),
        height: Math.ceil(boundingBox.height),
      });

      const pdfBuffer = await page.pdf({
        width: `${Math.ceil(boundingBox.width)}px`,
        height: `${Math.ceil(boundingBox.height)}px`,
        printBackground: true,
        margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      });

      await bodyHandle.dispose();
      return pdfBuffer;
    } catch (error) {
      if (browser) await browser.close();
      throw error;
    } finally {
      if (browser) await browser.close();
    }
  }
}
