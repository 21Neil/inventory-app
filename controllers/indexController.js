import { getAllCategories, getAllItems } from '../db/queries.js';

const getIndexView = async (req, res) => {
  const items = await getAllItems();
  const categories = await getAllCategories();
  res.render('index', {
    title: 'Inventory app',
    items,
    categories,
  });
};

export { getIndexView };
