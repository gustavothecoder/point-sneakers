let sneakersDatabase;
const sliderPrevButton = '<a class="carousel-control-prev" href="#sneaker-slide" role="button" data-slide="prev"><span class="carousel-control-prev-icon"></span><span class="sr-only">Previous</span></a>'
const sliderNextButton = '<a class="carousel-control-next" href="#sneaker-slide" role="button" data-slide="next"><span class="carousel-control-next-icon"></span><span class="sr-only">Next</span></a>'

$.getJSON('database/sneakers.json', function(data) {
    sneakers = data.sneakers.slice();
});

function GenerateTheSneakerPage(sneakerID) {
    setTimeout(() => {
        const sneaker = sneakers.find(sneaker => sneaker.id === sneakerID);
        GenerateBreadcrumb(sneaker);
        GenerateSlider(sneaker);
        GenerateSneakerInfo(sneaker);
        GenerateForm(sneaker);
    }, 25);
}

function GenerateBreadcrumb(sneaker) {
    $('[breadcrumb-active]').text(sneaker.name);
}

function GenerateSlider(sneaker) {
    sneaker.images.forEach((image, index) => {
        if (index < 1) {
            $('.carousel-indicators').append(`<li class="active" data-target="#sneaker-slide" data-slide-to="${index}"></li>`)
            $('[slider]').append(`<div class="carousel-item active" slider-item="${index}"></div>`);
        } else {
            if (index === 1) {
                $('[slider-buttons]').append(sliderPrevButton, sliderNextButton);
            }
            $('.carousel-indicators').append(`<li data-target="#sneaker-slide" data-slide-to="${index}"></li>`)
            $('[slider]').append(`<div class="carousel-item" slider-item="${index}"></div>`);
        }
        $(`[slider-item="${index}"]`).append(`<img src="${image}" alt="${sneaker.name}-${index}" class="d-block w-100">`)
    });
}

function GenerateSneakerInfo(sneaker) {
    if (sneaker.sale) {
        $('[sneaker-price]').text(`$${sneaker.newPrice}`);
        $('[old-price]').text(`$${sneaker.price}`);
    } else {
        $('[sneaker-price]').text(`$${sneaker.price}`);
    }
    $('[sneaker-brand]').text(sneaker.brand);
    $('[sneaker-name]').text(sneaker.name);
}

function GenerateForm(sneaker) {
    $('[buy-form]').append(`<input name="sneakerID" type="hidden" value="${sneaker.id}">`);
    GenerateSelectColor(sneaker.colors);
    if (sneaker.sale) {
        AddCartButton(sneaker.newPrice, sneaker.inStock);
    } else {
        AddCartButton(sneaker.price, sneaker.inStock);
    }
}

function GenerateSelectColor(colors) {
    colors.forEach((color, index) => {
        $('[sneaker-colors]').append(`<option value="${index}">${color}</option>`);
    });
}

function AddCartButton(price, inStock) {
    if (inStock) {
        $('[buy-form]').append(`<button class="add-to-cart btn w-100 my-3 py-2" type="submit">Add to Cart • $${price}</button>`);
    } else {
        $('[buy-form]').append(`<a class="add-to-cart btn w-100 my-3 py-2 disabled" role="button" >Sold Out • $${price}</a>`);
    }
}