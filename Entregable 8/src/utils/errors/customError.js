export default class CustomError {
    static createCustomError({ name = 'Error', cause, message }) {
        const newError = new Error(message)
        newError.name = name
        newError.cause = cause
        throw newError
    }
}
