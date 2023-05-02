import { Router } from "express";
import isLogged from "../middlewares/isLogged.middleware.js";
import mailingController from "../controllers/mailing.controller.js";

const router = Router();

// Ruta para enviar un email con el ticket de compra  mail/send/:ticketId
router.get('/send/:ticketId', isLogged, mailingController.sendTicketOrder);

export default router;