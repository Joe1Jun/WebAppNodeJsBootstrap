// Youtube video below was studied for add to cart. It included the calculate total and quantityControl function shown below.
//<!-- https://www.youtube.com/watch?v=bTYqeQ6p7bM&t=6023s -->
// Youtube video below helped to understand session in node
//https://www.youtube.com/watch?v=TDe7DRYK8vU&t=19s
// Web lesson below had some good ideas for add to cart.
// <!-- https://www.webslesson.info/2023/03/how-to-make-shopping-cart-in-nodejs.html-->
  
  //exports calculate Total functiuon as a module
  function calculateTotal(cart,req) {
    let total = 0;
    // Loop over cart to get price and quantity
    for (let i = 0; i < cart.length; i++) {
      // Convert quantity to a number
      // Parse the string to an integer
      const quantity = parseInt(cart[i].quantity); 
     
      // Check if quantity is a valid number
      if (!isNaN(quantity)) {
        total += cart[i].price * quantity;
       
      } else {
        console.log('Invalid quantity for item:', cart[i].name);
      }
    }
   
    return total;
  }



function quantityControl(Id, increase_btn, decrease_btn, cart) {
    

//if increase btn is selected iterates thorugh the loop based on productId and increases quantity by 1
if (increase_btn) {
  //loops through the cart items that are stored in the session.
  for (let i = 0; i < cart.length; i++){
     // Check if the cart item matches the product ID and if its quantity is greater than 0
    if (cart[i].Id === Id) {
      if (cart[i].quantity > 0) {
        //Increment the quantity of the product by 1
        //parseInt() is used here to convert the string value of cart[i].quantity into an 
        //integer so that 1 can be added to it.
        //this is necessary because form input values are typically treated as strings,
        //and arithmetic operations require numeric values.
           cart[i].quantity = parseInt(cart[i].quantity ) + 1 ;
          }
        }

  }

}
//if increase btn is selected iterates thorugh the loop based on productId and decreases quantity by 1
if (decrease_btn) {
  //loops through the cart items that are stored in the session.
  for (let i = 0; i < cart.length; i++){
    // Check if the cart item matches the product ID and if its quantity is greater than 0
    if (cart[i].Id === Id) {
      if (cart[i].quantity > 0) {
        // Decrement the quantity of the product by 1
        cart[i].quantity = parseInt(cart[i].quantity) - 1;
          }
        }

  }

}

}
 



   //exports calculateTotal function and quantityControl as modules.

  module.exports = {  calculateTotal, quantityControl};