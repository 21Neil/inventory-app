import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getItemByCategory,
} from '../db/queries.js';

const getCategoryView = async (req, res) => {
  const { id } = req.params;
  const items = await getItemByCategory(id);
  const category = await getCategoryById(id);
  res.render('category', {
    title: category[0].name,
    items,
    categoryId: category[0].id
  });
};

const getDeleteCategory = async (req, res) => {
  const { id } = req.params;

  if (id === 1) res.redirect('/');
  await deleteCategory(id);
  res.redirect('/');
};

const postNewCategory = async (req, res) => {
  const { name } = req.body;

  await createCategory(name)
  res.redirect('/')
}

const getNewCategoryView = (req, res) => {
  res.render('newCategory', {
    title: 'New category'
  })
}

export { getCategoryView, getDeleteCategory, postNewCategory, getNewCategoryView };
