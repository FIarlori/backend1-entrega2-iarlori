
const ProductService = require('../services/products.service');
const productService = new ProductService();

class ProductsController {
    async getProducts(req, res) {
        try {
            const products = await productService.getProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.pid);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async addProduct(req, res) {
        try {
            const newProduct = await productService.addProduct(req.body);
            
            req.app.get('io').emit('updateProducts', await productService.getProducts());
            
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
            req.app.get('io').emit('updateProducts', await productService.getProducts());
            res.json(updatedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const result = await productService.deleteProduct(req.params.pid);
            
            req.app.get('io').emit('updateProducts', await productService.getProducts());
            
            res.json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = ProductsController;