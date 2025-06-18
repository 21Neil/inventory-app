import { Router } from 'express';
import { getNewItemView, postNewItem } from '../controllers/itemController.js';
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const itemsRouter = Router();

itemsRouter.get('/new', getNewItemView);
itemsRouter.post('/new', upload.single('image'), postNewItem);

export default itemsRouter;
