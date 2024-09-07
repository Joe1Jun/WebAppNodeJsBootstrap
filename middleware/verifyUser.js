const jwt = require ('jsonwebtoken')
const db = require('../database')

//Middleware function to verify the jwt token and authenticate the user.

const verifyUser = (req, res, next) =>{
    
    const token = req.cookie.jwt

    if (!token) {
        return res.status(401).redirect('/login', {
            message : "Please log in first"
        })
    }
    // verify token using secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(400).redirect('/login', {
                message: "An error occured. Please try again"
            })
        }
        //query database to find user by the decoded Id 
        db.query('SELECT * FROM users WHERE Id = ?', [decoded.id], (error, results) => {

            if (error || !results.length) {
                return res.status(401).redirect('/login', {message : 'An error occured. Please try again'})
            }
           // Populates and sets the req.user object to the successful first result in the results array from the database query
            req.user = results[0]

            next()
        })
    })
    
}

module.exports = verifyUser