const validateSearch = async (req, res, next) => {
    if (!req.query.search) {
        return res.render('movie404', {
            movie404: `What movie do you want to see?`,
            layout: 'secondary'
        })
    }
    next()
}



module.exports = validateSearch