let sneakers;
let sneakersSortedByPriceLowToHigh;

$.getJSON("database/sneakers.json", function(data) {
    sneakers = data.sneakers.slice();
    sneakersSortedByPriceLowToHigh = data.sneakers.slice().sort(OrderByPriceLowToHigh);
}); 

function OrderByPriceLowToHigh(sneakerA, sneakerB) {
    if (!sneakerA.inStock) {
        sneakerA = 999;
    } else if (sneakerA.sale) {
        sneakerA = sneakerA.newPrice;
    } else {
        sneakerA = sneakerA.price;
    }
    if (!sneakerB.inStock) {
        sneakerB = 999;
    } else if (sneakerB.sale) {
        sneakerB = sneakerB.newPrice;
    } else {
        sneakerB = sneakerB.price;
    }
    return sneakerA - sneakerB;
}

function ShowSneakers() {
    const option = document.getElementsByClassName('sort-select')[0].selectedIndex;
    DeleteCardItems();
    if (option == 0) {
        Show(sneakers);
    } else if (option == 1) {
        Show(sneakersSortedByPriceLowToHigh);
    }
}

function DeleteCardItems() {
    $('[card-item]').each(function() {
        $(this).remove();
    });
}

function Show(sneakers) {
    $('[sneaker-card]').each(function (index) {
        $(`[sneaker-image="${index}"]`).append(`<img card-item class="card-img-top w-100" src="${sneakers[index].imagePath}" alt="">`);
        $(`[sneaker-info="${index}"]`).append(`<p card-item class="card-text text-center mb-0 font-weight-bold">${sneakers[index].brand}</p>`,
                                              `<p card-item class="card-text text-center">${sneakers[index].name}</p>`);
        if (sneakers[index].inStock) {
            if (sneakers[index].sale) {
                $(`[sneaker-info="${index}"]`).append(`<div card-item class="price d-flex justify-content-center" sneaker-price="${index}"></div>`);
                $(`[sneaker-price="${index}"]`).append(`<p card-item class="card-text mr-2">$${sneakers[index].newPrice}</p>`,
                                                       `<p card-item class="old-price card-text">$${sneakers[index].price}</p>`);
            } else {
                $(`[sneaker-info="${index}"]`).append(`<p card-item class="card-text text-center">$${sneakers[index].price}</p>`);
            }
        } else {
            $(`[sneaker-info="${index}"]`).append('<p card-item class="card-text text-center font-italic">Sold Out</p>');
        }
    })
}