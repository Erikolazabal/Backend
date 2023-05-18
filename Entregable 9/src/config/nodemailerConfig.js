import nodemailer from 'nodemailer'
import compliler from 'nodemailer-express-handlebars'
import { __dirname } from '../__dirname.js'
import envConfig from './envConfig.js'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envConfig.gmailUser,
        pass: envConfig.gmailPassword
    }
})

transporter.use('compile', compliler({
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: __dirname+'/views/layouts',
        defaultLayout: false,
        partialsDir: __dirname+'/views'
    },
    viewPath: __dirname+'/views',
    extName: '.handlebars'
}))