//link below to understand fetch data from the server and update the DOM based on the response.
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://www.javascripttutorial.net/web-apis/javascript-fetch-api/
// https://www.youtube.com/watch?v=E0UGGxd2DOo
//https://www.youtube.com/watch?v=cuEtnrL9-H0
//https://www.youtube.com/watch?v=XHokFQeQ6Lk&list=PLK5U0tyd34tBsRqm-ki81vtlioGv9j7Ky&index=1
//https://github.com/techiediaries/react-json-fetch-rest-api-example

// JavaScript code to update cart count in the navbar
function updateCartCount() {
    // Fetch the cart count from the server
    fetch('/cart/count')
    // Parse the JSON response
    //it is chained to the fetch('/cart/count') call.
    //it receives the response from the server as an argument.
    //res.json() parses the JSON response from the server, converting it into a JavaScript object.
    //The result of response.json() is a promise that resolves to the parsed JSON data.
        .then(res => res.json()) 
        
        
    //the second then is chained to the first .then() and receives the parsed JSON data as an argument .
    //it updates the cart count element on the webpage with the data received from the server.
    //document.getElementById('cart-count') selects the HTML element with the ID 'cart-count' that can be span  found span element in navbar.
    //cartCountElement.textContent = data.cartCount; updates the text content of the selected HTML element with the cart count received from the server.
    //this is where the actual update of the webpage content with the cart count occurs.
    .then(data => {
        // Update the cart count element on the webpage
        
        const cartCountElement = document.getElementById('cart-count');
         // Update the cart count text
        cartCountElement.textContent = data.cartCount;
    })
    .catch(error => {
        // handle errors if fetching the cart count fails
        console.error('Error fetching cart count:', error);
    });
}

// call the function to update cart count when the page loads
window.addEventListener('DOMContentLoaded', updateCartCount);


