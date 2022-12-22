const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)

})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(body.url && body.title)) {
    response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const result = await blog.save()
  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) => {

  const removed = await Blog.findByIdAndRemove(request.params.id)

  if (removed) {
    response.status(204).end()
  }
  response.status(404).send(`error: can't find id <${request.params.id}> to remove`)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  console.log('id ', request.params.id)
  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  if (updated) {
    response.status(200).send(`info: updated <${request.params.id}>`)
  }
  response.status(404).send(`error: can't find id <${request.params.id}> to update`)
})

module.exports = blogRouter