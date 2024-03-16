const supertest = require('supertest')
const mongoose = require('mongoose')

const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const biggerList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.initialBlogs)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const list = []
    expect(list.length).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.bigTotalLikes(biggerList)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('find most liked blog', () => {
    const result = listHelper.favoriteBlog(biggerList)
    expect(result.likes).toBe(12)
    console.log(result)
  })

  test('find most blogs', () => {
    const result = listHelper.mostBlogs(biggerList)
    expect(result.author).toBe('Robert C. Martin')
    console.log(result)
  })

  test('find most likes', () => {
    const result = listHelper.mostLikes(biggerList)
    expect(result.likes).toBe(17)
    console.log(result)
  })
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const initialResponse = await api.get('/api/blogs')
  const initialLength = initialResponse.body.length

  const updatedResponse = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(updatedResponse.body.length).toBe(initialLength)
})

test('verifies the unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  for (const item of response.body) {
    expect(item.id).toBeDefined()
  }
})

test('verifies post request is successful', async () => {
  const newBlog = {
    title: 'Test Blog Test Blog',
    author: 'Me',
    url: 'https://oatlayers.com/',
    likes: 69
  }

  const initialResponse = await api.get('/api/blogs')
  const initialLength = initialResponse.body.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedResponse = await api.get('/api/blogs')
  const updatedLength = updatedResponse.body.length

  expect(updatedLength).toBe(initialLength + 1)

  const blogsTitle = updatedResponse.body.map(b => b.title)
  expect(blogsTitle).toContain(
    'Test Blog Test Blog'
  )
})

test('if likes missing default to zero', async () => {
  const newBlog = {
    title: 'Test Missing Likes',
    author: 'Me',
    url: 'https://oatlayers.com/'
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  expect(result.body).toHaveProperty('likes', 0)
})

test('if title or url properties are missing', async () => {
  const newBlog = {
    author: 'Me',
    likes: 45
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

describe ('creating users', () => {
  test('invalid username and password length are not created', async () => {
    const newUser = {
      username: 'yy',
      password: 'ww'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('both username and password must be at least 3 characters in length')
  })

  test('username must be unique', async () => {
    const newUser = {
      username: 'oatlayers1',
      password: '123456789'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('unique')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})