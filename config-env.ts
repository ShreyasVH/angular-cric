const fs = require('fs');

const values = `
export const environment = { 
    production: ${JSON.parse(String(process.env['PRODUCTION'] ?? false))}, 
    apiUrl: '${process.env['API_ENDPOINT']}'
};`

fs.writeFileSync('./src/environments/environments.ts', values);