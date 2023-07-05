const getCurrenSessionUser = async (req,res) => {
    try {
        const currentSesison = req.session
        const currentUser = currentSesison.user
        res.send(currentUser)
    } catch (error) {
        res.send(error)
    }
}

export default {
    getCurrenSessionUser,
}