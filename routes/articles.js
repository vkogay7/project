const express = require("express");
const router = express.Router();
const articleService = require('../service/article-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const articles = await articleService.getAll(order);
    res.json(articles);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const article = await articleService.getById(id);

    if (article) {
        res.json(article);
    } else {
        res.status(404).send("Not found");
    }
})

router.post('/', async (req, res) => {
    const data = req.body;

    if (
        data.title === undefined || data.title?.trim() === "" ||
        data.text === undefined || data.text?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const article = await articleService.create(data);

    res.status(201).json(article);
})

router.put('/:id', (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        data.title === undefined || data.title?.trim() === "" ||
        data.text === undefined || data.text?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const article = articles.find(article => article.id === id);

    if (article === undefined) {
        res.status(404).send("Not found")
        return;
    }

    article.title = data.title;
    article.text = data.text;

    res.status(202).json(article);
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = articles.findIndex(article => article.id === id);

    if (index !== -1) {
        articles.splice(index, 1);
        res.status(204).send("No Content");
    } else {
        res.status(404).send("Not Found");
    }
})

module.exports = router;