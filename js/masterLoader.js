const XLSX = require('xlsx');

function loadMasterData(filePath) {
    const workbook = XLSX.readFile(filePath);

    const sheet = workbook.Sheets['Sheet1'];

    if (!sheet) {
        return [];
    }

    const rows = XLSX.utils.sheet_to_json(sheet, {
        defval: ''
    });

    const masterDatabase = [];

    rows.forEach((row) => {
        const product = {
            sapCode: String(row['SAP Code'] || '').trim(),
            productDescription: String(
                row['Product Description as per SAP'] || ''
            ).trim(),
            gtin: String(row['GTIN'] || '').trim(),
            retailerCodes: {}
        };

        const skipColumns = [
            'FG Group',
            'FG Group Description',
            'Article Description',
            'GTIN',
            'SAP Code',
            'Product Description as per SAP'
        ];

        Object.keys(row).forEach((column) => {
            if (!skipColumns.includes(column)) {
                const value = row[column];

                if (
                    value !== '' &&
                    value !== null &&
                    value !== undefined
                ) {
                    product.retailerCodes[column] = String(value).trim();
                }
            }
        });

        masterDatabase.push(product);
    });

    return masterDatabase;
}

module.exports = loadMasterData;