const mainImage = document.querySelector(".main-image");
const minusIcon = document.querySelector(".minus-icon");
let productQty = document.querySelector(".product-qty");
let productQtyNotifications = document.querySelector(".product-qty-notifications");
const plusIcon = document.querySelector(".plus-icon");

const lightbox = document.querySelector(".lightbox");
const closeLightboxIcon = document.querySelector(".close-lightbox-icon");
const lightboxMainImage = document.querySelector(".lightbox .main-image");

const cart = document.querySelector(".cart");
const notifications = document.querySelector(".notifications");
const cartDiv = document.querySelector(".cart-div");
const addtoCartBtn = document.querySelector(".add-to-cart-btn");
const priceInCart = document.querySelector(".price-in-cart");
const deleteIcon = document.querySelector(".delete-icon");

const menuIcon = document.querySelector(".menu-icon")
const sidebar = document.querySelector(".sidebar");

function changeProductQty() {
    minusIcon.addEventListener("click", () => {
        if (productQty.innerText > 0) {
            productQty.innerText--;
            
            if (productQty.innerText == 0) {
                cartDiv.flexDirection = "column";
                cartDiv.innerHTML = `
                <p class="cart-heading">Cart</p>
                <hr>
                <p class="cart-empty">Your cart is empty</p>`
            }
        }
    });

    plusIcon.addEventListener("click", () => {
        productQty.innerText++;
    });
}

function changeProductQtyNotifications(productQty) {
    if (productQty.innerText == 0) {
        notifications.style.display = "none";
    }

    else {
        productQtyNotifications.innerText = productQty.innerText;
        notifications.style.display = "block";
    }
}

function changeMainImage() {
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail) => {
        const thumbnailIndex = thumbnail.dataset.index;

        thumbnail.addEventListener("click", () => {
            thumbnails.forEach((thumb) => thumb.classList.remove("selected-thumbnail"));

            // add "selected-thumbnail" class to the clicked thumbnail
            thumbnail.classList.add("selected-thumbnail");

            // update main image in the non-lightbox view
            mainImage.src = `./images/image-product-${thumbnailIndex}.jpg`;

            // ensure lightbox main image updates to match
            lightboxMainImage.src = mainImage.src;
        });
    });
}

window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 401px)").matches) {
        // Add the click event listener for larger screens
        mainImage.addEventListener("click", showLightbox);
    } 
    
    else {
        // Remove the event listener for smaller screens
        mainImage.removeEventListener("click", showLightbox);
    }
});

function showLightbox() {
    // make lightbox visible
    lightbox.classList.add("lightbox-visible");

    // ensure lightbox main image matches the current main image
    lightboxMainImage.src = mainImage.src;
}

if (window.matchMedia("(min-width: 401px)").matches) {
    mainImage.addEventListener("click", showLightbox);
}

function changeLightboxMainImage() {
    const lightboxMainImage = document.querySelector(".lightbox .main-image");
    const mainImage = document.querySelector(".main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevIcon = document.querySelector(".prev-icon");
    const nextIcon = document.querySelector(".next-icon");

    const totalImages = thumbnails.length;

    // initialize current index from the main image source
    let currentIndex = Array.from(thumbnails).findIndex((thumbnail) => {
        return mainImage.src.includes(`image-product-${thumbnail.dataset.index}.jpg`);
    });

    // Ensure the currentIndex is within the valid range (0 to 3)
    currentIndex = Math.max(0, Math.min(currentIndex, totalImages - 1)); // Ensure valid range

    // update lightbox image
    function updateLightboxImage(index) {
        if (currentIndex === -1) {
            index = 0;
        }

        if (currentIndex >= 3) {
            index = 0;
        }

        currentIndex = index;

        const newImageSrc = `./images/image-product-${currentIndex + 1}.jpg`;

        // update lightbox main image
        lightboxMainImage.src = newImageSrc;

        // update thumbnail highlighting
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("selected-thumbnail", i === currentIndex);
        });
    }

    // event listeners for navigation icons
    prevIcon.addEventListener("click", () => {
        updateLightboxImage(currentIndex - 1);
    });

    nextIcon.addEventListener("click", () => {
        updateLightboxImage(currentIndex + 1);
    });

    // thumbnail click functionality
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            updateLightboxImage(index);
        });
    });

    // initialize lightbox image to reflect the current main image
    updateLightboxImage(currentIndex);
}

// close lightbox when close icon is clicked
closeLightboxIcon.addEventListener("click", () => {
    lightbox.classList.remove("lightbox-visible");
});

cart.addEventListener("click", () => {
    if (cartDiv.classList.contains("cart-div-visible")) {
        cartDiv.classList.remove("cart-div-visible");
    }

    else if (!cartDiv.classList.contains("cart-div-visible")) {
        cartDiv.classList.add("cart-div-visible");
    }
});

function addtoCart() {
    addtoCartBtn.addEventListener("click", () => {
        changeProductQtyNotifications(productQty);

        if (productQty.innerText > 0) {
            cartDiv.style.justifyContent = "center";
            cartDiv.innerHTML = `
            <p class="cart-heading">Cart</p>
            <hr>
            <div class="cart-product-details">
                <img src="./images/image-product-1-thumbnail.jpg" alt="product thumbnail 1" class="product-image thumbnail cart-thumbnail">
                <div class="price-in-cart-div">
                    <p>Fall Limited Edition Sneakers</p>
                    <p class="price-in-cart">$125.00 x ${productQty.innerText} <span class="final-price">$${125 * parseInt(productQty.innerText)}.00</span></p>
                </div>
                <img src="./images/icon-delete.svg" alt="delete icon" class="delete-icon">
            </div>
            <button class="checkout-btn">Checkout</button>`
        }
    });
}

cartDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon")) {
        productQty.innerText = 0;
        notifications.style.display = "none";
        cartDiv.innerHTML = `
        <p class="cart-heading">Cart</p>
        <hr>
        <p class="cart-empty">Your cart is empty</p>`;
    }
});

function changeMainImageMobile() {
    const mainImage = document.querySelector(".main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevIconMobile = document.querySelector(".prev-icon-mobile");
    const nextIconMobile = document.querySelector(".next-icon-mobile");

    const totalImages = thumbnails.length;

    // initialize current index from the main image source
    let currentIndex = Array.from(thumbnails).findIndex((thumbnail) => {
        return mainImage.src.includes(`image-product-${thumbnail.dataset.index}.jpg`);
    });

    // Ensure the currentIndex is within the valid range (0 to 3)
    currentIndex = Math.max(0, Math.min(currentIndex, totalImages - 1)); // Ensure valid range

    // update lightbox image
    function updateMainImageMobile(index) {
        if (currentIndex === -1) {
            index = 0;
        }

        if (currentIndex >= 3) {
            index = 0;
        }

        currentIndex = index;

        const newImageSrc = `./images/image-product-${currentIndex + 1}.jpg`;

        // update lightbox main image
        mainImage.src = newImageSrc;

        // update thumbnail highlighting
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("selected-thumbnail", i === currentIndex);
        });
    }

    // event listeners for navigation icons
    prevIconMobile.addEventListener("click", () => {
        updateMainImageMobile(currentIndex - 1);
    });

    nextIconMobile.addEventListener("click", () => {
        updateMainImageMobile(currentIndex + 1);
    });
}

menuIcon.addEventListener("click", () => {
    if (sidebar.style.display == "flex") {
        sidebar.style.display = "none";
        menuIcon.src = "./images/icon-menu.svg";
    }

    else {
        sidebar.style.display = "flex";
        menuIcon.src = "./images/icon-close.svg";
    }
});

// initialize functions
changeProductQty();
changeMainImage();
changeLightboxMainImage();
addtoCart();
changeMainImageMobile();