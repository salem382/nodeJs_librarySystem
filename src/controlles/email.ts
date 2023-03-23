
import nodemailer from "nodemailer";
import UserModel from "../models/userModel";
import { VerifyEmail, verifyPassword} from "../utils/emails.html";
import { generateCode } from "../utils/helpers";


class Email {

    async sendEmail (options:any, verify:boolean = true) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ahmedsalem.official2@gmail.com',
              pass: 'cugzaiaabkzphuym',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const code = generateCode();
        await UserModel.findOneAndUpdate({email:options.email}, {verifyCode:code})
       
         await transporter.sendMail({
            from: '"Ahmed Salem " <ahmedsalem.official2@gmail.com>', 
            to: options.email, 
            subject: "Hello ✔", 
            html: verify?  VerifyEmail(options) : verifyPassword(code)
        });
    }
}

const emailService:Email = new Email();

export default emailService;