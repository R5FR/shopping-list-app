const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
    readData,
    writeData
};