const fs = require('fs');
const pdfParser = require('pdf-parse');

let dataBuffer = fs.readFileSync('catalogo/catalogo.pdf');

pdfParser(dataBuffer).then(function(data) {
    fs.writeFileSync('output-pdf-text.txt', data.text);
    console.log("PDF parsed successfully. Wrote to output-pdf-text.txt");
}).catch(err => {
    console.error(err);
});
