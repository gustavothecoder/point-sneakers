let cartDatabase;
let sneakersDB;

$.getJSON('database/cart.json', function(data) {
    cartDatabase = data.products.slice();
});

$.getJSON('database/sneakers.json', function(data) {
    sneakersDB = data.sneakers.slice();
});

function GenerateCart() {
    if (cartDatabase.length === 0) {
        GenerateEmptyCart();
    } else {
        GenerateCartWithProducts();    
    }
}

function GenerateEmptyCart() {
    $('.cart-title').text('Your cart is empty.');
    $('#checkOutForm').hide();
}

function GenerateCartWithProducts() {
    let product;
    cartDatabase.forEach((order, index) => {
        product = sneakersDB.find(sneaker => sneaker.id == order.productID);
        GenerateHTMLProductStructure(index, product);
        AddProductImage(index, product, order);
        AddProductInformationAndRemovalForm(index, product, order);
        AddTheRemovalFormFields(index, product, order);
        if (product.sale) {
            AddProductPrice(index, product.newPrice, order);
        } else {
            AddProductPrice(index, product.price, order);
        }
    });
}

function GenerateHTMLProductStructure(index, product) {
    $('.products').append(`<div class="product d-flex" product="${index}"></div>`, 
                          '<hr class="cart-line my-4">');
    $(`[product="${index}"]`).append(`<a href="#pages/sneaker-page.html" class="col-3 my-auto ml-3 ml-sm-5" cart-product-image="${index}" onclick="GenerateTheSneakerPage(${product.id})"></a>`,
                                     `<div class="sneaker-info col-3 my-auto" cart-product-info="${index}"></div>`, 
                                     `<div class="sale-info col m-auto d-flex align-items-center" cart-sale-info="${index}"></div>`);
}

function AddProductImage(index, product, order) {
    $(`[cart-product-image="${index}"]`).append(`<img class="img-fluid" src="${product.images[order.color]}" alt="">`);
}

function AddProductInformationAndRemovalForm(index, product, order) {
    $(`[cart-product-info="${index}"]`).append(`<p class="h5">${product.name}</p>`, 
                                               `<p class="size-color">${order.size} / ${product.colors[order.color]}</p>`,
                                               `<p>${product.brand}</p>`, 
                                               `<form action="/removeProduct" method="POST" remove-form="${index}"></form>`);
}

function AddTheRemovalFormFields(index, product, order) {
    $(`[remove-form="${index}"]`).append(`<input name="productID" type="hidden" value="${product.id}">`, 
                                         `<input name="color" type="hidden" value="${order.color}">`, 
                                         `<input name="size" type="hidden" value="${order.size}">`, 
                                         `<button class="btn remove-button pl-0" type="submit">REMOVE</button>`);
}

function AddProductPrice(index, price, order) {
    $(`[cart-sale-info="${index}"]`).append(`<p class="mb-0" unit-price="${index}">$${price}</p>`, 
                                            `<input class="col-4 mx-3" type="number" name="quantity"  min="1" max="10" value="${order.quantity}" onchange="CalculatePriceCart(${index})" quantity-of-product="${index}">`, 
                                            `<p class="mb-0" product-price="${index}">$${price*order.quantity}</p>`);
}

setTimeout(GenerateCart, 400);

function ShowCart() {
    $('.cart-area').fadeIn(50);
    $('.cart-background').fadeIn(350);
}

function CloseCart() {
    $('.cart-area').fadeOut(250);
    $('.cart-background').fadeOut(250);
}