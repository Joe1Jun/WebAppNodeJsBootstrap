// Import the mysql2 library for interacting with MySQL databases
const mysql2 = require("mysql2");
// Import the jsonwebtoken library for creating and verifying JWTs (JSON Web Tokens)
const jwt = require('jsonwebtoken');
// Import the bcryptjs library for hashing and comparing passwords
const bcrypt = require('bcryptjs');
// Import the promisify function from the util module to convert callback-based functions to promise-based
const { promisify } = require('util');
const db = require('../database'); // Import the database connection


exports.addToCart = async (req, res) => {
    //User id can be accessed because its been populated with the decoded Id in the verifyUser fucntion
    const userId = req.user.Id
    const { productId } = req.body

    if (!userId) {
        return res.status(401).redirect('login')    }
    
    //insert items into cart
    db.query('INSERT INTO cart (user_id, product_id) VALUES (?, ?) ', [userId, productId],  (error, results) => {
        if (error) {
            console.error("Error adding to cart:", error); // Log the error for debugging
           res.status(500).send("Internal Server Error")
        }
        
        res.status(200).redirect('/shop1')
        console.log("ITEM ADDED TO CART")

    } )
}

exports.getCart = (req, res) => {

    const userId = req.user.Id

    db.query(
        `SELECT
            cart.id,
            cart.user_id,
            cart.product_id,
            products.name,
            products.price,
            products.description,
            products.image1
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?`,
        [userId],
        (error, results) => {
        if (error) {
            console.error("Error retreiving cart:", error); // Log the error for debugging
           res.status(500).send("Internal Server Error")
        }

        res.status(200).render('cart', {
            cart: results
        })
        console.log("CART ITEMS RETREIVED")
        
        
    })



}

exports.removeFromCart = (req, res) => {
    


}

exports.changeProductQuantity = (req, res) => {
    


}