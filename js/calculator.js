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