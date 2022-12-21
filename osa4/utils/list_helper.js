const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((max, item) => item.likes > max ? item.likes : max, blogs[0].likes)
}

const mostBlogs = (blogs) => {

  let acc = _.reduce(blogs, (acc, obj) => {
    const key = obj.author

    if (!acc[key]) {
      acc[key] = 0
    }
    acc[key]++

    return acc
  }, {})

  if (Object.keys(acc)) {
    const authorMostBlogs = Object.keys(acc).reduce((a, b) => acc[a] > acc[b] ? a : b, 0)

    if (authorMostBlogs) {
      return { 'author': authorMostBlogs, 'blogs': acc[authorMostBlogs] }
    }
  }
  return {}
}

const mostLikes = (blogs) => {

  let acc = _.reduce(blogs, (acc, obj) => {
    const key = obj.author

    if (!acc[key]) {
      acc[key] = 0
    }
    acc[key] += obj.likes

    return acc
  }, {})

  if (Object.keys(acc)) {
    const authorMostLikes = Object.keys(acc).reduce((a, b) => acc[a] > acc[b] ? a : b, 0)
    if (authorMostLikes) {
      return { 'author': authorMostLikes, 'likes': acc[authorMostLikes] }
    }
  }
  return {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
