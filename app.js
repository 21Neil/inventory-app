import express from 'express';
import indexRouter from './routes/indexRouter.js';
import itemsRouter from './routes/itemsRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/images', express.static('images'));
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
