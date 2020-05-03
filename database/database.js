const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);

database.get('sneakers')
    .push({id: 9,
        imagePath: 'imgs/sneakers-for-sale/liquidation/nike-af1/nike-af1-black.jpg',
        brand: 'NIKE',
        name: 'Air Force 1',
        colors: ['Black'],
        price: 102,
        sale: false,
        newPrice: 0,
        inStock: false})
    .write();