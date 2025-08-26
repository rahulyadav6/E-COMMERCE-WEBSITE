import expess from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController';
const cartRouter = expess.Router();

cartRouter.post('/get', getUserCart);
cartRouter.post('/add', addToCart);
cartRouter.post('/update', updateCart);

export default cartRouter;