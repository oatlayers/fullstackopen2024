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

const favoriteBlog = (biggerList) => {
  const likesArray = biggerList.map(author => author.likes)
  return Math.max(...likesArray)
}

module.exports = {
  dummy,
  totalLikes,
  bigTotalLikes,
  favoriteBlog
}