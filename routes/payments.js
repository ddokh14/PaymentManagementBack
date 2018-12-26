const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Simple local storage for payments.
let payments = [
        {id: 0, title: 'payment1', category: 'gasoline', date: '2018-12-30', amount: '58.80', currency: 'GEL',comment: 'comment'},
        {id: 1, title: 'payment2', category: 'food', date: '2018-12-30', amount: '58.80',currency: 'GEL',comment: 'comment'},
        {id: 2, title: 'payment3', category: 'food', date: '2019-12-30', amount: '58.80',currency: 'GEL',comment: 'comment'},
        {id: 3, title: 'payment3', category: 'food', date: '2018-12-30', amount: '158.80',currency: 'GEL',comment: 'comment'},
        {id: 4, title: 'payment3', category: 'food', date: '2017-12-3', amount: '258.80',currency: 'GEL',comment: 'comment'},
        {id: 5, title: 'payment3', category: 'food', date: '2017-01-5', amount: '258.80',currency: 'GEL',comment: 'comment'},
    ];

/*
    GET /api/payments
*/
router.get('/', (req,res) => {
    res.send(payments);
});

/*
    GET /api/payments/:id
*/
router.get('/:id', (req,res) => {
    const payment = payments.find(p => p.id === parseInt(req.params.id));
    if(!payment) return res.status(404).send('The course with the given ID was not found.');

    res.send(payment);
});

/*
    POST /api/payments
*/
router.post('/', (req,res) => {
    const {error} = validatePayment(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const payment = {
        id: payments.length,
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date,
        comment: req.body.comment,
        currency: 'GEL',
    };
    payments.push(payment);

    res.send(payment);
});

/*
    PUT /api/payments/:id
*/
router.put('/:id', (req,res) => {
    const payment = payments.find(p => p.id === parseInt(req.params.id));
    if(!payment) return res.status(404).send('The course with the given ID was not found.');
    
    const {error} = validatePayment(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    payment.title = req.body.title;
    payment.amount = req.body.amount;
    payment.category = req.body.category;
    payment.date = req.body.date;
    payment.comment = req.body.comment;

    res.send(payment);
});

/*
    DELETE /api/payments/:id
*/
router.delete('/:id', (req,res) =>{
    const payment = payments.find(p => p.id === parseInt(req.params.id));
    if(!payment) return res.status(404).send('The course with the given ID was not found.');
    
    const index = payments.indexOf(payment);
    payments.splice(index, 1);

    res.send(payment);
});


/*
    Payment object validation using Joi.
*/
function validatePayment(payment) {
    const schema = {
        title: Joi.string().required(),
        amount: Joi.string().required(),
        category: Joi.string().required(),
        date: Joi.string().required(),
        comment: Joi.string().required(),
    };
    return Joi.validate(payment, schema);
}

module.exports = router;
