const express = require("express");
const router = express.Router();
// Import your authentication module
const auth = require('../auth'); 
// Import your database connection module
const db = require('../database.js'); 
//import functions.js module
const { calculateTotal,quantityControl } = require('../functions.js');


router.get("/", (req, res) => {
  res.render('index')
})


//route to  render about page
router.get("/about", (req, res) => {
 
res.render("about" );
});

// Route to render the login1 page
router.get('/login', (req, res) => {


  
  res.render("login", { message: "" }); // Render the login page with an empty message
});

router.get('/register', (req, res) => {
   res.render('register', {message: ""})
})


router.get('/shop1', (req, res) => {
      // Query to select all products from the database
       // stores the query in a variable called sql to improve readabilty
     
       // Execute the query
      
       db.query('SELECT * FROM prodCategories', (err, results) => {
        if (err) {
           throw err;
         }
         // Render the EJS template with product data
         // Passes the prodCategories objects to the ejs page
         // Will all be rendered dynamically.
         res.render('shop1', { prodCategories: results });
         console.log("Connected to table");
       });
});
   // ****** The productIds taken from the shop1 only display the correct items in shop2 because the Ids are the same *****//

 router.get('/shop2', (req, res) => {
   //This line extracts the value of the "id" query parameter from the request URL. This parameter is passed from the link in the "shop1.ejs" file.
   const productId = req.query.id;
   console.log(productId)
   // Check if the product ID is provided

   if (!productId) {
     // If not provided, send a 400 Bad Request response
       res.status(400).send('Product ID is required');
       return;
   }
    // Execute the SQL query using the connection object
   // The productId is passed as a parameter to the query to fetch the specific product
  // The callback function receives two parameters: 'err' for potential errors and 'result' for the query result
   db.query('SELECT * FROM products WHERE Id = ?', [productId], (error, result) => {

     // If an error occurs during the query, throw the error
     if (error) {
       console.log(error)
       res.status(500).send("Interal Server Error")
           throw error;
       }
       // Check if the result is falsy (null, undefined, empty) or if the result array is empty
     if (!result || result.length === 0) {
         // If the product is not found in the database,
         // set the HTTP response status to 404 Not Found
         // and send a message indicating that the product was not found
           res.status(404).send('Product not found');
           return;
       }

       // Renders the shop2.ejs template with the product data
     // as this page only renders one result the result set to the first index
     res.render('shop2', { product: result[0], message: "" });
   });
 });


 router.get('/cart', (req, res) => {
  res.render('cart', { cartItems: [] }); // Initially send empty cartItems
 });

router.get('/checkout', (req, res) => {
   
  res.render('checkout', {cartItems: []})
 })

router.post('/cart', (req, res) => {
  const cartItems = req.body.cartItems || [];
  res.render('cart', { cartItems });
});



 // Route to view the checkout page from the checkout button
router.get('/checkout', (req, res) => {
  

  
  
  
  

});






// router.get('/login', (req, res) => {


//   //pass empty message string to message template in login.ejs file
//   //this message will appear when authentication fails in post method below.
//   res.render("login", { message: "" })
  
// });


// // Route handler for handling POST requests to '/checkout' thats requested from login page
// // Login page is only rendered hen checking out if the user has not already been authenticated.
// router.post('/checkout', (req, res) => {
//   // Extracting username and password from request body
//   const { username, password } = req.body;
//    // Authenticate user with the provided username and password
//   const authenticated = auth.authenticateUser(username, password);
//   // If user is authenticated successfully
//   if (authenticated) {
//       // Set isAuthenticated flag in session to true
//     req.session.isAuthenticated = true;
//     console.log("login successfull")
//       // Redirect to checkout page after successfull log in 
//       res.redirect('/checkout');
//   } else {
//       // If authentication fails, render the login page with an error message
//       res.render("login", { message: "Incorrect username or password. Please try again." });
//   }
//   //debugging
//   console.log(req.body);

// });



// // Route to add item to cart

// // Youtube video below was studied for add to cart.
// //<!-- https://www.youtube.com/watch?v=bTYqeQ6p7bM&t=6023s -->
// // Youtube video below helped to understand session in node
// //https://www.youtube.com/watch?v=TDe7DRYK8vU&t=19s
// // Web lesson below had some good ideas for add to cart.
// // <!-- https://www.webslesson.info/2023/03/how-to-make-shopping-cart-in-nodejs.html-->

// router.post('/add_to_cart', (req, res) => {
//   // Retrieve product information from the request body
 
//   const { Id, name, price, description, quantity, image1 } = req.body;

//   // Create a product object using the retrieved information
//   const product = { Id, name, price, description, quantity, image1 };
//   // Add the product to the session cart
//   // Check if the cart array exists in the session
//   if (!req.session.cart) {
//   // If the cart array doesn't exist, initialize it as an empty array
//       req.session.cart = [];
//   }
//   // Push the product object into the cart array
//    req.session.cart.push(product);
//   // Redirect to the cart page after adding the product to the cart
//   res.redirect('/shop1');
// });


// // Youtube video below was studied for add to cart.
// //<!-- https://www.youtube.com/watch?v=bTYqeQ6p7bM&t=6023s -->
// // Youtube video below helped to understand session in node
// //https://www.youtube.com/watch?v=TDe7DRYK8vU&t=19s
// // Web lesson below had some good ideas for add to cart.
// // <!-- https://www.webslesson.info/2023/03/how-to-make-shopping-cart-in-nodejs.html-->



  

//   //call calculate total function 
//   const total = calculateTotal(cart, req); 
  

//    // Render the cart page with cart and total data
//   // cart: cart passes the cart object to the template with the key 'cart'.
//  // total: total passes the total object to the template with the key 'total'.
//   res.render('cart', { cart: cart, total: total });

  
// });


// // Route handler for handling GET requests to '/cart/count'
// //link below to understand fetch data from the server and update the DOM based on the response.
// //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// //https://www.javascripttutorial.net/web-apis/javascript-fetch-api/
// // https://www.youtube.com/watch?v=E0UGGxd2DOo
// //https://www.youtube.com/watch?v=cuEtnrL9-H0
// //https://www.youtube.com/watch?v=XHokFQeQ6Lk&list=PLK5U0tyd34tBsRqm-ki81vtlioGv9j7Ky&index=1
// //https://github.com/techiediaries/react-json-fetch-rest-api-example

// router.get('/cart/count', (req, res) => {
//   // Retrieve the cart from the session and calculate the cart count
//   // Check if the 'cart' exists in the session
//   let cartCount;
//     if (req.session.cart) {
//   // If 'cart' exists, set 'cartCount' to the length of the 'cart' array
//      cartCount = req.session.cart.length;
//    } else {
//   // If 'cart' doesn't exist, set 'cartCount' to 0
//   cartCount = 0;
// }

//   // Send the cart count as JSON response
//   res.json({ cartCount: cartCount });
// });
// // These links helped with the logic below for bothe remove product and edir product quantity.
// //https://www.youtube.com/watch?v=TDe7DRYK8vU&t=19s
// //<!-- https://www.youtube.com/watch?v=bTYqeQ6p7bM&t=6023s -->
// // <!-- https://www.webslesson.info/2023/03/how-to-make-shopping-cart-in-nodejs.html-->
// //post method to remove item from cart 
// router.post('/remove_product', (req, res) => {
//   //get id from form
//   const Id = req.body.Id;
//   //requests the cart in this session
//   const cart = req.session.cart;
//   //loop over the items in the cart
//   for (let i = 0; i < cart.length; i++){

//     if (cart[i].Id == Id) {
//       //splice function to remove product from cart

//       cart.splice(cart.indexOf(i), 1);
//     }
//   }

// //re calculate total
//   calculateTotal(cart, req);
//   //redirect back to cart page 
//   res.redirect('/cart');

// })

// //route handler for handling POST requests to '/edit_product_quantity'

// router.post('/edit_product_quantity', (req, res) => {
//   //get values from inputs
//   // extract product ID from the form
//   const Id = req.body.Id;
//   //extract product quantity from the form
//   const quantity = req.body.quantity;
//   // Check if increase button is clicked
//   const increase_btn = req.body.increase_product_quantity;
//   //checks if decrease button is pressed
//   const decrease_btn = req.body.decrease_product_quantity;
//   //retreive cart data from the session
//   const cart = req.session.cart;
//   // Debugging logs
//   console.log('Increase button clicked:', increase_btn);
//   console.log('Decrease button clicked:', decrease_btn);
//   console.log('Cart:', cart);

// //calls quantityControl method in functions.js module
//   quantityControl(Id, increase_btn, decrease_btn, cart);
//   // Debugging log after quantity modification
//   console.log('Cart after modification:', cart);
//   //call calculate total to recalculate total depending on the quantity selected
//   calculateTotal(cart, req);
//   // Redirect the user to the '/cart' page after editing the quantity
//   res.redirect('/cart');

// })

// router.post('/order_confirmation', (req, res) => {
 
//   //acquire the name from the form 
//   const name = req.body.name;
//   //clears the cart once the purchase is made.
//   req.session.cart = [];
 
  
// //renders the order_confirmation page with the obtained name inserted dynamically
//   res.render('order_confirmation', {  name: name });
//   console.log(name)
// });

// router.post('/logout', (req, res) => {

  

//  //sets user session glaf to false logging user ur of the session
//   req.session.isAuthenticated = false
//   if (!req.session.isAuthenticated) {
//     //log to check if user is logged out
//     console.log("User logged out ")
//   }

//   //after log out user is redirected to the home page

//   res.redirect('/');


// });


// //exports routes as modules

module.exports = router;



// //<div class="container text-center" id="checkout-main-container">
// <!--total is displayed dynamically and is calculated by the calculateTotal function in functions.js module-->
// <h5 class="mb-4">Total:€<%= total %></h5>
// <div class="container text-center">
//   <!-- Form for checkout button -->
//   <!--checkout button links to /checkout page unless user is not authenticated true auth.js and express-session in which case they will be directed to log in -->