
const ProductService = require('../services/products.service');
const productService = new ProductService();

class ViewsController {
    async getHome(req, res) {
        try {
            const products = await productService.getProducts();
            res.render('home', { products });
        } catch (error) {
            res.status(500).render('home', { products: [], error: error.message });
        }
    }

    async getRealTimeProducts(req, res) {
        try {
            const products = await productService.getProducts();
            res.render('realTimeProducts', { products });
        } catch (error) {
            res.status(500).render('realTimeProducts', { products: [], error: error.message });
        }
    }
}

module.exports = ViewsController;