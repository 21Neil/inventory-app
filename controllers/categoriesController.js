import { getCategoryById, getItemByCategory } from "../db/queries.js"

const getCategoryView = async (req, res) => {
  const items = await getItemByCategory(req.params.id)
  const category = await getCategoryById(req.params.id)
  console.log(items)
  res.render('category', {
    title: category[0].name,
    items
  })
}

export {
  getCategoryView
}
