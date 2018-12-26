const express = require('express');
const payments = require('./routes/payments');
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use('/api/payments', payments);

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));