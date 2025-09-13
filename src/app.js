const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');

const ProductService = require('./services/products.service');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const productService = new ProductService();

app.engine('handlebars', handlebars.engine({
    defaultLayout: false 
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('io', io);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'Backend en funcionamiento', timestamp: new Date().toISOString() });
});

io.on('connection', async (socket) => {
    console.log('Cliente conectado');
    
    try {
        const products = await productService.getProducts();
        socket.emit('updateProducts', products);
    } catch (error) {
        socket.emit('error', error.message);
    }

    socket.on('addProduct', async (productData) => {
        try {
            await productService.addProduct(productData);
            const products = await productService.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await productService.deleteProduct(id);
            const products = await productService.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});