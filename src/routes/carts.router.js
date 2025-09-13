const { Router } = require('express');
const CartsController = require('../controllers/carts.controller');

const router = Router();
const cartsController = new CartsController();

router.post('/', cartsController.createCart.bind(cartsController));
router.get('/:cid', cartsController.getCart.bind(cartsController));
router.post('/:cid/product/:pid', cartsController.addProductToCart.bind(cartsController));

module.exports = router;