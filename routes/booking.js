const express = require('express');

const BookingController = require('../controller/booking');

const router = express.Router();

router.post('/search-cars', async (req, res) => {
    const {from, to} = req.query;
    const availableCars = await BookingController.searchCars(from, to);
    res.send('Search Cars');
});
router.post('/:carId/book', (req, res) => {

});


module.exports = router;
