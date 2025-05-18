let bar = document.getElementById("bar");
let nav = document.getElementById("navbar");
let close = document.getElementById("close");

if (bar) {
bar.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.toggle("active");
});
}

if (close) {
close.addEventListener("click", (e) => {
    e.preventDefault(); 
    nav.classList.remove("active"); 
});
}

// Function to add product to cart
function addToCart(event) {
    const productElement = event.target.closest('.pro');
    const productName = productElement.querySelector('h5').textContent;
    const priceText = productElement.querySelector('.price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const image = productElement.querySelector('img').src;
  
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name: productName, price: price, image: image });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
  }
  
  // Attach event listeners to all cart icons
  document.querySelectorAll('.cart').forEach(icon => {
    icon.addEventListener('click', addToCart);
  });
  
  // Update cart count in navbar
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('home-cart-count').textContent = cartItems.length;
  }
  
  // Initialize cart count on page load
  updateCartCount();



// Function to update the cart count in the navbar
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation()


// Initialize cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = cart.length;
    });
  }
  
  // Update cart count on page load
  document.addEventListener('DOMContentLoaded', updateCartCount);