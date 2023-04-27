import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
}