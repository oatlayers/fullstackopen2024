const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const commentsRouter = require('./comments')

blogsRouter.use('/:id/comments', commentsRouter)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const userId = request.user

  if (!userId) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(userId)

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
    const userId = request.user
    const blog = await Blog.findById(request.params.id)

    if (!userId) {
      return response.status(401).json({ error: 'invalid token' })
    }

    if (blog.user.toString() === userId.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'invalid user' })
    }
  }
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
