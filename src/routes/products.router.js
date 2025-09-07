const { Router } = require('express');
const { ProductManager } = require('../managers/ProductManager.js');

const router = Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const updatedProduct = await productManager.updateProduct(
            req.params.pid, 
            req.body
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const result = await productManager.deleteProduct(req.params.pid);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;