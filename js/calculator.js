function CalculateValue() {
    let price = $('[sneaker-price]').text();
    price = price.replace('$', '');
    const quantity = $('.quantity-input').val();
    if (quantity == 1) {
        $('.add-to-cart').text(`Add to cart • $${price*quantity}`);
    } else {
        $('.add-to-cart').text(`Add to cart • $${price*quantity} (${quantity})`);
    }
}

function CalculatePriceCart(orderID) {
    let unitPrice = $(`[unit-price="${orderID}"]`).text();
    unitPrice = unitPrice.replace('$', '');
    const quantity = $(`[quantity-of-product="${orderID}"]`).val();
    $(`[product-price="${orderID}"]`).text(`$${unitPrice*quantity}`);
    CalculateSubTotal();
}

function CalculateSubTotal() {
    let subTotal = 0, productPrice;
    $('[product-price]').each(function(index) {
        productPrice = $(this).text();
        productPrice = productPrice.replace('$', ' ');
        subTotal += parseInt(productPrice);
    });
    $('[sub-total]').text(`$${subTotal}`);
}

setTimeout(CalculateSubTotal, 450);