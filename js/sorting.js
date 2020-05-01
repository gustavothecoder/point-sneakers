class Sneaker {
    constructor(imagePath, brand, name, price, sale, newPrice, inStock) {
        this.imagePath = imagePath;
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.sale = sale;
        this.newPrice = newPrice;
        this.inStock = inStock;
    }
}

const nikeSbSj = new Sneaker('imgs/sneakers-for-sale/nike-sb-sj-light-pink.jpg', 'NIKE SB', 'Nike SB Stefan Janoski', 119, false, '', true);
const nikeEpicReact = new Sneaker('imgs/sneakers-for-sale/nike-epic-react-grey.jpg', 'NIKE', 'Nike Epic React', 150, false, '', true);
const airJordan3 = new Sneaker('imgs/sneakers-for-sale/air-jordan-3-orange.jpg', 'AIR JORDAN', 'Jordan 3', 195, false, '', true);
const converseCkHigh = new Sneaker('imgs/sneakers-for-sale/converse-chuck-taylor-high.jpg', 'CONVERSE', 'Converse Chuck Taylor High', 62, false, '', true);
const airJordan1 = new Sneaker('imgs/sneakers-for-sale/air-jordan-1-light-blue.jpg', 'AIR JORDAN', 'Jordan 1', 270, false, '', true);
const nikeAf270 = new Sneaker('imgs/sneakers-for-sale/nike-air-force-270.jpg', 'NIKE', 'Nike Air Force 270', 180, false, '', true);
const adidasNmdR1 = new Sneaker('imgs/sneakers-for-sale/adidas-nmd.jpg', 'ADIDAS', 'Adidas NMD_R1', 72, false, '', true);
const adidasSuperstar = new Sneaker('imgs/sneakers-for-sale/liquidation/adidas-superstar-white.jpg', 'ADIDAS', 'Adidas Superstar', 65, true, 39, true);
const nikeAf1Black = new Sneaker('imgs/sneakers-for-sale/liquidation/nike-af1-black.jpg', 'NIKE', 'Nike Air Force 1', 102, false, '', false);
const sneakersByPriceLowToHigh = [nikeSbSj, nikeEpicReact, airJordan3, converseCkHigh, airJordan1, nikeAf270, adidasNmdR1, adidasSuperstar, nikeAf1Black];
const featuredSneakers = sneakersByPriceLowToHigh.slice();
sneakersByPriceLowToHigh.sort(OrderByPriceLowToHigh); 

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

function OrderSneakers() {
    const option = document.getElementsByClassName('sort-select')[0].selectedIndex;
    DeleteCardItems();
    if (option == 0) {
        Show(featuredSneakers);
    } else if (option == 1) {
        Show(sneakersByPriceLowToHigh);
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