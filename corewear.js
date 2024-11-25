// Initialize the cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/** Add a product to the cart */
function addToCart(product, price, image) {
    const parsedPrice = parseFloat(price.replace('$', '').trim()); // Ensure price is a number

    if (isNaN(parsedPrice)) {
        console.error('Invalid price value:', price); // Log an error if the price is invalid
        return; // Stop execution if the price is invalid
    }

    // Check if the product already exists in the cart
    const existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // Add a new item to the cart
        cart.push({ product, price: parsedPrice.toFixed(2), quantity: 1, image });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart quantity display in the navbar
    updateCartQuantity();
}

/** Update the cart quantity display in the navbar */
function updateCartQuantity() {
    const cartQuantity = document.getElementById('cart-quantity');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartQuantity) {
        cartQuantity.textContent = totalItems;
    }
}

/** Redirect to the cart page when the "Cart" button is clicked */
function goToCartPage() {
    window.location.href = 'cart.html'; // Make sure this path is correct
}

/** Update the cart page with item details on cart.html */
function updateCartPage() {
    const cartPageItems = document.getElementById('cart-page-items');
    const cartPageTotal = document.getElementById('cart-page-total');

    if (cart.length === 0) {
        cartPageItems.innerHTML = '<p>Your cart is empty!</p>';
        cartPageTotal.textContent = 'Total: $0.00';
        return;
    }

    cartPageItems.innerHTML = ''; // Clear previous content
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-content">
                <div class="cart-item-details">
                    <h3>${item.product}</h3>
                    <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartPageItems.appendChild(cartItem);
        total += item.quantity * parseFloat(item.price); // Calculate total for each item
    });

    cartPageTotal.textContent = `Total: $${total.toFixed(2)}`; // Display total cart value at the bottom
}

/** Remove an item from the cart by index */
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    updateCartQuantity(); // Update cart icon quantity
    updateCartPage(); // Refresh cart page view
}

/** Show product details in the modal */
function showProductDetails(name, price, image) {
    const descriptions = {
        "White Tee": "Plain White T-Shirt",
        "Tan Tee": "Plain Tan T-Shirt",
        "Grey Tee": "Plain Grey T-Shirt",
        "Green Tee": "Plain Green T-Shirt",
        "Black Tee": "Plain Black T-Shirt",
        "Brown Tee": "Plain Brown T-Shirt",
        "Black Pants": "Black Straight Work Pants",
        "Black Shorts": "Plain Black Sweatshorts",
        "Black Sweatpants": "Plain Black Sweats with cuffed bottoms",
        "Grey Shorts": "Plain Grey Sweatshorts",
        "Grey Sweatpants": "Plain Grey Sweats with cuffed bottoms",
        "Tan Pants": "Tan Straight Work Pants",
        "Black Hoodie": "Plain Black Hoodie",
        "Black Sweatshirt": "Plain Black Sweatshirt",
        "Dark Grey Hoodie": "Plain Dark Grey Hoodie",
        "Dark Grey Sweatshirt": "Plain Dark Grey Sweatshirt",
        "Navy Hoodie": "Plain Navy Hoodie",
        "Navy Sweatshirt": "Plain Navy Sweatshirt",
        "Hooded Leather Jacket": "Black Leather Jacket with Removable Hood",
        "Button Leather Jacket": "Black Leather Jacket with Buttons",
        "Rain Jacket": "Navy Insulated Rain Jacket",
        "Faux Fur Jacket": "Brown Faux Fur Jacket with hood and large collar",
        "Tan Long Coat": "Long Sleeve Woolen Coat",
        "Bomber Jacket": "Quilted Lined Bomber Jacket",
        "Faded Jeans": "Dark Blue Faded Jeans",
        "Blue Wash Jeans": "Slightly Faded Blue Jeans",
        "Distressed Denim Jacket": "Blue Distressed Jean Jacket",
        "Light Wash Denim Jacket": "Plain Light Wash Denim Jacket",
        "Dark Blue Denim Shorts": "Plain Dark Blue Denim Shorts",
        "Light Wash Denim Overalls": "Plain Slightly Faded Blue Denim Overalls"
    };

    const description = descriptions[name] || "No description available.";

    // Get the modal and content container
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-content");

    // Create the HTML content for the modal
    modalContent.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}" class="modal-image">
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button class="add-to-cart" onclick="addToCart('${name}', '${price}', '${image}')">Add to Cart</button>
    `;

    // Show the modal
    modal.style.display = "block";
}

/** Close the modal */
function closeModal() {
    const modal = document.getElementById("product-modal");
    modal.style.display = "none";
}

// Close the modal if clicked outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById("product-modal");
    if (event.target === modal) {
        closeModal();
    }
}

/** Initialize the cart page functionality */
document.addEventListener('DOMContentLoaded', () => {
    updateCartPage(); // Update cart page when the document is ready
});


    // Get the search input element
    const searchInput = document.getElementById('searchInput');
    
    // Get all the product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Listen for user input in the search bar
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search
        
        productCards.forEach(card => {
            // Get the product name or title from the card (assuming the title is in an h3 element)
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            
            // If the product name includes the search term, show it, else hide it
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

