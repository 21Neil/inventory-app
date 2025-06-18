import express from 'express';
import indexRouter from './routes/indexRouter.js';
import itemsRouter from './routes/itemsRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/images', express.static('images'));
app.use('/items', itemsRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
