const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id

  const blog = await Blog.findById(blogId).populate('user', {
    username: 1,
    name: 1,
  })
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const userid = request.user

  if (!userid) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(userid)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const userid = request.user
    const blog = await Blog.findById(request.params.id)

    if (!userid) {
      return response.status(401).json({ error: 'invalid token' })
    }

    // blog.user.toString() gets the id of the user who made the blog. userid gets the id of the user trying to delete the blog
    if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'invalid user' })
    }
  },
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedNote)
})

module.exports = blogsRouter
