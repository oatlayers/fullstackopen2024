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

  const theObj = {
    title: biggerList[findIndex].title,
    author: biggerList[findIndex].author,
    likes: biggerList[findIndex].likes
  }

  return theObj
}

const mostBlogs = (biggerList) => {
  const blogsArray = biggerList.map(author => author.blogs)
  const mostBlogs = Math.max(...blogsArray)
  const findIndex = blogsArray.findIndex(i => i === mostBlogs)

  const theObj = {
    author: biggerList[findIndex].author,
    blogs: biggerList[findIndex].blogs
  }

  return theObj
}

module.exports = {
  dummy,
  totalLikes,
  bigTotalLikes,
  favoriteBlog,
  mostBlogs
}