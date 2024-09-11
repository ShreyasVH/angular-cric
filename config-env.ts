const fs = require('fs');
const path = require('path');

const values = `
export const environment = { 
    production: ${JSON.parse(String(process.env['PRODUCTION'] ?? false))}, 
    apiUrl: '${process.env['API_ENDPOINT']}'
};`

const environmentsFolderPath = path.resolve(__dirname, './src/environments')
if (!fs.existsSync(environmentsFolderPath)) {
    fs.mkdirSync(environmentsFolderPath);
}

fs.writeFileSync('./src/environments/environments.ts', values);