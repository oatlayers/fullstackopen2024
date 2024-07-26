const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const dummy = () => {
  return 1
}

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog[0].likes
}

const bigTotalLikes = (biggerList) => {
  const likesArray = biggerList.map((author) => author.likes)

  const totalSum = likesArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  )

  return totalSum
}

// put all likes in an array, find the biggest and assign it to a variable and find the index of that, make a new obj and return it
const favoriteBlog = (biggerList) => {
  const likesArray = biggerList.map((author) => author.likes)
  const mostLiked = Math.max(...likesArray)
  const findIndex = likesArray.findIndex((i) => i === mostLiked)

  return {
    title: biggerList[findIndex].title,
    author: biggerList[findIndex].author,
    likes: biggerList[findIndex].likes,
  }
}

const mostBlogs = (biggerList) => {
  // obj to store author: value pair
  const blogCountByAuthor = {}

  // iterate for each blog if 0 (default) or not then add 1
  biggerList.forEach((blog) => {
    const author = blog.author
    blogCountByAuthor[author] = (blogCountByAuthor[author] || 0) + 1
  })

  // find the author with the highest number of blogs
  const mostFrequentAuthor = Object.keys(blogCountByAuthor).reduce((a, b) =>
    blogCountByAuthor[a] > blogCountByAuthor[b] ? a : b,
  )

  return {
    author: mostFrequentAuthor,
    blogs: blogCountByAuthor[mostFrequentAuthor],
  }
}

const mostLikes = (biggerList) => {
  // obj to store author: value pair
  const likesByAuthor = {}

  // iterate for each blog to find amount of likes; if it doesnt have a value yet use 0, if they do, use that value and then add with current likes value
  biggerList.forEach((blog) => {
    const author = blog.author
    const likes = blog.likes

    likesByAuthor[author] = (likesByAuthor[author] || 0) + likes
  })

  // find author with the most likes, start with -1 to ensure any likes count is greater
  let mostLikesAuthor
  let maxLikes = -1

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author]
      mostLikesAuthor = author
    }
  }

  return {
    author: mostLikesAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  bigTotalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
