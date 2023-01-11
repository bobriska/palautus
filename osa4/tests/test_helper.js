const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialUsers = [
  {
    _id: '63a549724c1eef45b55f5ad0',
    username: 'rriska',
    name: 'Robert Riska',
    passwordHash: '$2b$10$AjSErhdWiRC/qRdHVqP2r.rv7vd4zmjHv9.YQjY4gB1AkzvLdwFyq',
    blogs:['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8'],
    __v: 0
  }
]

const token = 'Bearer '
  + jwt.sign(
    { username: initialUsers[0].username, id: initialUsers[0]._id, },
    // eslint-disable-next-line no-undef
    process.env.SECRET, { expiresIn: 60*60 }
  )

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '63a549724c1eef45b55f5ad0',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '63a549724c1eef45b55f5ad0',
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  token,
  blogsInDb,
  usersInDb
}