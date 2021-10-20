import { serverConfig } from '@src/config';
import { EmailInfo } from '@src/types/email';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  static username: string;
  static password: string;

  constructor() {
    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      host: serverConfig.emailHost,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: serverConfig.emailUser || EmailService.username,
        pass: serverConfig.emailPass || EmailService.password,
      },
    });
  }

  static async loadTestAccount(): Promise<void> {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();
    this.username = testAccount.user;
    this.password = testAccount.pass;
  }

  async sendEmail(emailInfo: EmailInfo): Promise<void> {
    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: 'MindPath Test', // sender address
      ...emailInfo,
    });
    console.log('Message sent: %s', info.messageId);
    return;
  }
}
