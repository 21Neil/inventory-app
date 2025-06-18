import pool from './pool.js';

const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM items');
  return result.rows;
};

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

const createItem = async ({
  name,
  description,
  quantity,
  thumbnail_url,
  img_url,
  category_id,
}) => {
  await pool.query(
    'INSERT INTO items (name, description, quantity, thumbnail_url, img_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
    [name, description, quantity, thumbnail_url, img_url, category_id]
  );
};

const getItemByCategory = async (id) => {
  const result = await pool.query('SELECT * FROM items WHERE category_id = $1', [id])
  return result.rows
}

const getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id])
  return result.rows
}

export { getAllItems, getAllCategories, createItem, getItemByCategory, getCategoryById };
