import pool from './pool.js';

const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM items');
  return result.rows;
};

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

export { getAllItems, getAllCategories };
