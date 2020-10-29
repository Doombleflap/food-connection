// Documentation by Andrew Glenn 10/22/2020

// Constant 'router' created to route schema models to the database
const router = require('express').Router();
// The 'Food' model from 'food.models.js' is called
const Food = require('../models/food.model');

// Retrieves 'Food' data from the database to determine errors
// (Needs more information on this, I believe that this catches errors for duplicates)
router.route('/').get((req, res) => {
    Food.find()
        .then(foods => res.json({ result: 1, foods: foods }))
        .catch(err => res.status(400).json({ result: 0, message: 'Error' + err }));
});

// Posts foods to the database, if any exceptions are caught, an error will be posted.
router.route('/add').post((req, res) => {
    const food = req.body.food;
    const newFood = new Food(food);
    newFood.save()
        .then(() => res.json({ result: 1, message: 'Food added!' }))
        .catch(err => {
            res.status(400).json({ result: 0, message: 'Error: ' + err })
        });
});

module.exports = router;