const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return { items: [] };
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
};

router.get('/', (req, res) => {
    const data = readData();
    res.json(data.items);
});

router.post('/', (req, res) => {
    const { name, priority } = req.body;
    const data = readData();
    const newItem = { id: Date.now(), name, priority, inBasket: false };
    data.items.push(newItem);
    writeData(data);
    res.json(newItem);
});

router.put('/:id', (req, res) => {
    const { name, priority, inBasket } = req.body;
    const { id } = req.params;
    const data = readData();
    const itemIndex = data.items.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
        const item = data.items[itemIndex];
        item.name = name !== undefined ? name : item.name;
        item.priority = priority !== undefined ? priority : item.priority;
        item.inBasket = inBasket !== undefined ? inBasket : item.inBasket;
        writeData(data);
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const data = readData();
    const itemIndex = data.items.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
        data.items.splice(itemIndex, 1);
        writeData(data);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

module.exports = router;
