const express = require('express');
const router = express.Router();

const restaurants = require('../data');
let currentId = 7;

router.get('/', (req, res) => {
    res.json(restaurants);
});
router.get('/:id', (req, res) => {
    const restaurantId = Number.parseInt(req.params.id, 10);
    const restaurantFind = restaurants.find(
        (restaurant) => {
            return restaurant.id === restaurantId;
        });
    res.json(restaurantFind);
});

router.post('/', (req, res) => {
    currentId +=1;
    const newRestaurant = {
        id : currentId,
        ...req.body
    };
    restaurants.push(newRestaurant);
    res.json(newRestaurant);
});

router.put('/:id', (req, res) => {
    const restaurantId = Number.parseInt(req.params.id, 10);
    const restaurantIndex = restaurants.findIndex( (restaurant) => restaurant.id === restaurantId);
    const updatedRestaurant = {
        id : restaurantId,
        ...req.body
    };
    restaurants[restaurantIndex]  = updatedRestaurant;
    res.json(updatedRestaurant);
});

router.delete('/:id', (req, res) => {
    const restaurantId = Number.parseInt(req.params.id, 10);
    const restaurantIndex = restaurants.findIndex( (restaurant) => restaurant.id === restaurantId);
    restaurants.splice(restaurantIndex, 1);
    res.sendStatus(204); //ทำงานเสร็จสมบูรณ์ ไม่ส่งอะไรกลับ
});

module.exports = router;