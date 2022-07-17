import { hashSync, compareSync } from 'bcrypt';
import { createTransport } from 'nodemailer';

const salts = 12;

const transport = createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

export class Utils {
  async hashPassword(password: string): Promise<string>{
    return await hashSync(password, salts);
  }

  async comparePassword(password, compare) {
    return await compareSync(password, compare);
  }

   private getVerifyToken() {
    let result = "";
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    const charactersLength = characters.length;
    for (let i = 0; i < 48; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async sendVerifyEmail(email, name, token) {
    await transport.sendMail({
      to: email,
      from: 'hola@canguroreal.com',
      subject: 'Verify Email',
      text: '¡Bienvenido!',
      html: `<b>Hola, ${name}. </b>Por favor, verifica tu cuenta dando click <a href="http://localhost:${process.env.PORT}/login/verify/${token}" target="_blank">Aquí</></b>`, // HTML body content
    });
    await transport.close();
  }
}