/* eslint-disable indent */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const user = new User(helper.initialUsers[0])
  await user.save()

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

})

describe('returning blogs initially saved', () => {
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('there is identifier id in blogs returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a specific blogs title is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'React patterns'
  )

})
})

describe('adding blogs', () => {
test('a valid blog can be added', async () => {

  const newBlog = {
    title: 'Callback Hell',
    author: 'Max Ogden',
    url: 'http://callbackhell.com/',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: helper.token })
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain(
    'Callback Hell'
  )
})

test('a blog added without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Developed by Ed',
    author: 'Ed',
    url: 'https://developedbyed.com/',
    userId: helper.initialUsers[0]._id
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: helper.token })
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()

  const lastBlog = blogsAtEnd.pop()

  expect(lastBlog.likes).toBe(0)
})

test('a blog added without title and url returns bad request', async () => {
  const newBlog = {
    author: 'Seymore Butts',
    userId: helper.initialUsers[0]._id
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: helper.token })
    .send(newBlog)
    .expect(400)

})
})

describe('deletion of a blog', () => {
test('a blog added can be deleted', async () => {
  const newBlog = {
    title: 'Developed by Ed',
    author: 'Ed',
    url: 'https://developedbyed.com/',
    userId: helper.initialUsers[0]._id
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: helper.token })
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()

  const lastId = blogsAtEnd.pop().id

  await api
    .delete(`/api/blogs/${lastId}`)
    .set({ Authorization: helper.token })
    .expect(204)
})

test('blog with same id can\'t be deleted twice', async () => {

  const newBlog = {
    title: 'Developed by Ed',
    author: 'Ed',
    url: 'https://developedbyed.com/',
    userId: helper.initialUsers[0]._id
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: helper.token })
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()

  const lastId = blogsAtEnd.pop().id

  await api
    .delete(`/api/blogs/${lastId}`)
    .set({ Authorization: helper.token })
    .expect(204)

    await api
    .delete(`/api/blogs/${lastId}`)
    .set({ Authorization: helper.token })
    .expect(404)
})
})

describe('updating a blog', () => {
    test('updating a blog should return updated blog', async () => {

        const newBlog = {
          title: 'Developed by Ed',
          author: 'Ed',
          url: 'https://developedbyed.com/',
          userId: helper.initialUsers[0]._id,
          likes: 7
        }

        await api
          .post('/api/blogs')
          .set({ Authorization: helper.token })
          .send(newBlog)
          .expect(201)

        const blogsToUpdate = await helper.blogsInDb()

        const blogToUpdate = blogsToUpdate.pop()
        const updateBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            userId: helper.initialUsers[0]._id,
            likes: 2
        }

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(updateBlog)
          .expect(200)

          const blogsAtEnd = await helper.blogsInDb()

          const lastBlog = blogsAtEnd.pop()

          expect(lastBlog.likes).toBe(2)

    })
})

describe('creating users', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: usersAtStart[0].username,
      name: usersAtStart[0].name,
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fo',
      name: 'foo bar',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'foo',
      name: 'foo bar',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})