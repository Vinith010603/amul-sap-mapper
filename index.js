const readline = require('readline');
const loadMasterData = require('./js/masterLoader');

const products = loadMasterData('./data/master.xlsx');

console.log('\nAMUL SAP MAPPER');
console.log('==============================');
console.log(`Database Loaded: ${products.length} Products\n`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter SAP Code / GTIN / Retailer Code (or EXIT): ', (answer) => {
    const input = answer.trim();

    if (input.toUpperCase() === 'EXIT') {
        console.log('\nGoodbye!');
        rl.close();
        return;
    }

    let foundProduct = null;
    let matchedBy = '';

    for (const product of products) {
        if (
            product.sapCode &&
            product.sapCode.toUpperCase() === input.toUpperCase()
        ) {
            foundProduct = product;
            matchedBy = 'SAP Code';
            break;
        }

        if (product.gtin === input) {
            foundProduct = product;
            matchedBy = 'GTIN';
            break;
        }

        const retailerMatch = Object.values(
            product.retailerCodes
        ).some(
            (code) =>
                String(code).toUpperCase() === input.toUpperCase()
        );

        if (retailerMatch) {
            foundProduct = product;
            matchedBy = 'Retailer Code';
            break;
        }
    }

    if (!foundProduct) {
        console.log('\nProduct Not Found');
        rl.close();
        return;
    }

    console.log('\nPRODUCT DETAILS');
    console.log('==============================');

    console.log(`Matched Via : ${matchedBy}`);
    console.log(`SAP Code    : ${foundProduct.sapCode}`);
    console.log(`Description : ${foundProduct.productDescription}`);
    console.log(`GTIN        : ${foundProduct.gtin}`);

    console.log('\nRetailer Codes');
    console.log('------------------------------');

    Object.entries(foundProduct.retailerCodes).forEach(
        ([retailer, code]) => {
            console.log(`${retailer} : ${code}`);
        }
    );

    rl.close();
});