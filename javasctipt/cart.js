// Updated displayCartItems function with quantity controls
function displayCartItems() {
  const cartContainer = document.getElementById('cart-container');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  let html = '';
  
  if (cartItems.length === 0) {
    html = '<p class="empty-cart">Your cart is empty. <a href="../Templetes/index.html">Continue shopping</a></p>';
  } else {
    cartItems.forEach((item, index) => {
      html += `
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}/-</p>
            <div class="quantity-controls">
              <button class="quantity-btn minus">-</button>
              <span class="quantity-display">${item.quantity || 1}</span>
              <button class="quantity-btn plus">+</button>
            </div>
          </div>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    });
  }
  
  cartContainer.innerHTML = html;
  
  // Add event listeners for quantity controls
  document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', updateQuantity);
  });
  
  // Add event listeners for delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteItem);
  });
}

function updateQuantity(event) {
  const button = event.target;
  const cartItem = button.closest('.cart-item');
  const index = parseInt(cartItem.dataset.index);
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  
  if (button.classList.contains('plus')) {
    cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
  } else if (button.classList.contains('minus')) {
    cartItems[index].quantity = Math.max(1, (cartItems[index].quantity || 1) - 1);
  }
  
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateTotals();
  displayCartItems(); // Refresh display to show updated quantities
}

function deleteItem(event) {
  const button = event.target;
  const index = parseInt(button.closest('.cart-item').dataset.index);
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));
  
  cartItems = cartItems.filter((_, i) => i !== index);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  updateTotals();
  displayCartItems();
  updateCartCount();
}

// Updated updateTotals function to handle quantities
function updateTotals() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);
  
  document.getElementById('subtotal').textContent = `₹${subtotal}/-`;
  const shipping = 50;
  const total = subtotal + shipping;
  document.getElementById('total').textContent = `₹${total}/-`;
}

// Update initial display
document.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
  updateTotals();
});


document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.querySelector('.checkout');
  const orderMsg    = document.getElementById('order-success');
  const form        = document.querySelector('.billing-form');

  checkoutBtn.addEventListener('click', function(e) {
    e.preventDefault();  // stop real submit

    // Trigger HTML5 validation UI
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // If we’re here, all required inputs are filled & valid
    orderMsg.textContent = '🎉 Your order has been placed successfully!';
    orderMsg.style.display = 'block';

    // Clear & refresh cart
    localStorage.removeItem('cartItems');
    updateCartCount?.();
    updateTotals();
    displayCartItems();
    checkoutBtn.disabled = true;
  });
});
