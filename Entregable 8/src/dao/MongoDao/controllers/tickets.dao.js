import CustomError from '../../../utils/errors/customError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../../../utils/errors/errors.enums.js'
import { ticketModel } from '../models/ticket.model.js'
import BasicDao from './basic.dao.js'

class TicketDao extends BasicDao{
    constructor(model){
        super(model)
    }

    async getAll(){
        try {
            const response = await ticketModel.find()
            return response
        } catch (error) {
            throw CustomError.createCustomError({
                name: ErrorsName.FETCH_ERROR,
                cause: ErrorsCause.FETCH_ERROR,
                message: ErrorsMessage.FETCH_ERROR,
                statusCode: 500,
                originalError: error 
            })
        }
    }
    
}

export default new TicketDao(ticketModel)