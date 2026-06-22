const XLSX = require('xlsx');

const wb = XLSX.readFile('./data/master.xlsx');
const ws = wb.Sheets['Sheet1'];

const data = XLSX.utils.sheet_to_json(ws);

console.log('ROWS:', data.length);
console.log('FIRST ROW:', data[0]);