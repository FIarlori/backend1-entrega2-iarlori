const CartService = require('../services/carts.service');
const cartService = new CartService();

class CartsController {
    async createCart(req, res) {
        try {
            const newCart = await cartService.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCart(req, res) {
        try {
            const cart = await cartService.getCart(req.params.cid);
            res.json(cart);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const cart = await cartService.addProductToCart(
                req.params.cid, 
                req.params.pid
            );
            res.json(cart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CartsController;