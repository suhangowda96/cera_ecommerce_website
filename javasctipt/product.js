 // Product Gallery
 const images = [
  '../Images/product1/1size.webp',
  '../Images/product1/shopping.webp',
  '../Images/product1/shopping (2).webp',
  '../Images/product1/shopping (1).webp'
];

function changeImage(index) {
  document.getElementById('mainImage').src = images[index];
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// Quantity Selector
function incrementQuantity() {
  const input = document.getElementById('quantity');
  input.value = parseInt(input.value) + 1;
}

function decrementQuantity() {
  const input = document.getElementById('quantity');
  if (input.value > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

// Add to Cart
function addToCart() {
  const product = {
    name: document.querySelector('.product-title').innerText,
    price: 999,
    size: document.getElementById('size').value,
    quantity: document.getElementById('quantity').value,
    image: images[0]
  };

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCartCount();
  alert('Product added to cart!');
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = cart.length;
  });
}

// Initialize cart count
updateCartCount();