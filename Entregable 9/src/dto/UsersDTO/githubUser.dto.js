export default class GithubUserDTO{
    constructor(user, cartId){
        this.first_name = user.name.split(' ')[0]
        this.last_name = user.name.split(' ')[1] || ' '
        this.email = user.email
        this.password = " "
        this.role = 'user'
        this.cart = cartId
    }
}