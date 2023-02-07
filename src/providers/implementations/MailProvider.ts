import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { MailProviderProtocol, MessageProps } from '../MailProviderProtocol';

class MailProvider implements MailProviderProtocol {
  private readonly transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT as unknown as number,
      secure: Number(process.env.MAIL_PORT) === 465 ? true : false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  async sendEmail(message: MessageProps): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

export { MailProvider };
