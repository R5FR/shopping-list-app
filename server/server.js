const express = require('express');
const bodyParser = require('body-parser');
const items = require('./routes/items');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/api/items', items);

app.listen(port, () => console.log(`Server running on port ${port}`));