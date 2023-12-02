const pool = require('./config')
const express = require('express')
const router = express.Router()

//GET LIST FILM
router.get('/DVDRental',(req, res) => {
    const query = 'SELECT * FROM film'

    pool.query(query, (err,result) => {
        if(err) throw err;

        res.status(200).json(result)
    })
})

//GET FILM BY ID
router.get('/DVDRental/film/:id', (req, res) => {
    const {id} = req.params

    const query = `SELECT * FROM film WHERE film_id = ${id}`

    pool.query(query, (err, result) => {
        if(err) throw err;

        res.status(200).json(result.rows)
    })
})  



// GET LIST CATEGORY
router.get('/DVDRental/category', (req, res) => {
    const {id} = req.params

    const query = `SELECT * FROM category`

    pool.query(query, (err, result) => {
        if(err) throw err;

        res.status(200).json(result.rows)
    })
})  

// GET LIST FILM BY CATEGORY
router.get('/DVDRental/category/:category', (req, res) => {
    const { category } = req.params;

    const query = `
        SELECT f.name
        FROM film f
        JOIN film_category ON film.id = film_category.film_id
        JOIN category ON film_category.category_id = category.id
        WHERE category.category_id = $1;
    `;

    pool.query(query, (err, result) => {
        if (err) throw err;

        res.status(200).json(result.rows);
    });
});

module.exports = router