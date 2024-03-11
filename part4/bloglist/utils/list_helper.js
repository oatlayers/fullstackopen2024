const dummy = () => {
  return 1
}

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog[0].likes
}

const bigTotalLikes = (biggerList) => {
  const likesArray = biggerList.map(author => author.likes)

  const totalSum = likesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  return totalSum
}

// put all likes in an array, find the biggest and assign it to a variable and find the index of that, make a new obj and return it
const favoriteBlog = (biggerList) => {
  const likesArray = biggerList.map(author => author.likes)
  const mostLiked = Math.max(...likesArray)
  const findIndex = likesArray.findIndex(i => i === mostLiked)

  return {
    title: biggerList[findIndex].title,
    author: biggerList[findIndex].author,
    likes: biggerList[findIndex].likes
  }
}

const mostBlogs = (biggerList) => {
  // obj to store author: value pair
  const blogCountByAuthor = {}

  // iterate for each blog if 0 (default) or not then add 1
  biggerList.forEach(blog => {
    const author = blog.author
    blogCountByAuthor[author] = (blogCountByAuthor[author] || 0) + 1
  })

  // find the author with the highest number of blogs
  const mostFrequentAuthor = Object.keys(blogCountByAuthor).reduce((a, b) => blogCountByAuthor[a] > blogCountByAuthor[b] ? a : b)

  return {
    author: mostFrequentAuthor,
    blogs: blogCountByAuthor[mostFrequentAuthor]
  }
}

const mostLikes = (biggerList) => {
  // obj to store author: value pair
  const likesByAuthor = {}

  // iterate for each blog to find amount of likes; if it doesnt have a value yet use 0, if they do, use that value and then add with current likes value
  biggerList.forEach(blog => {
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
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  bigTotalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}