const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

commentsRouter.get('/', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId).populate('comments', { comment: 1 })
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.json(blog.comments)
})

commentsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id
    const { comment } = request.body
    const userId = request.user

    if (!userId) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(blogId)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    const newComment = new Comment({ comment })
    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
  }
)

module.exports = commentsRouter
