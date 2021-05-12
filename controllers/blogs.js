const Blog = require('../models/Blogs')

module.exports.index = async (req, res) => {
  const { keyword } = req.query
  if (keyword) {
    const foundedTitle = await Blog.find({
      title: keyword,
    }).sort({
      createdAt: -1,
    })
    const foundedBody = await Blog.find({
      $text: { $search: keyword },
    }).sort({
      createdAt: -1,
    })
    const foundedTag = await Blog.find({ tags: keyword }).sort({
      createdAt: -1,
    })
    if (foundedBody || foundedTag || foundedTitle) {
      const foundedBlog = [...foundedBody, ...foundedTag, ...foundedTitle]
      res.render('index', { allBlogs: foundedBlog })
    }
  } else {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 })
    res.render('index', { allBlogs })
  }
}

module.exports.create = async (req, res) => {
  const { author, title, tags, body } = req.body
  const newTags = tags.split(',').map((el) => el.trim())
  const newBlog = new Blog({
    author,
    title,
    tags: newTags,
    body,
  })
  await newBlog.save()
  res.redirect('/api/posts')
}

module.exports.delete = async (req, res) => {
  const { id } = req.params
  await Blog.findByIdAndDelete(id)
  res.redirect('/api/posts')
}
