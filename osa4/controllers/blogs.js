const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})



blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!(body.url && body.title)) {
    response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const toBeRemoved = await Blog.findById(request.params.id)

  if (toBeRemoved) {
    if (toBeRemoved.user.toString() === user._id.toString()) {
      const removed = await Blog.findByIdAndRemove(request.params.id)
      if (removed) {
        response.status(204).end()
      }
    }
  } else {
    response.status(404).send(`error: can't find id <${request.params.id}> to remove`)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  if (updated) {
    response.status(200).send(`info: updated <${request.params.id}>`)
  }
  response.status(404).send(`error: can't find id <${request.params.id}> to update`)
})

module.exports = blogRouter