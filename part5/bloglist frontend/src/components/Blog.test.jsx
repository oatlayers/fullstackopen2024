import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// need to make sure this is actually what the exercise asked for.

test('renders title and author, but not its URL or number of likes by default', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    user: { name: 'oatlayers4' }
  }
  const user = 'oatlayers4'

  const { container } = render(<Blog blog={blog} user={user}/>)
  const titleAuthor = container.querySelector('#title-author')
  const checkStyle = container.querySelector('#content')

  screen.debug(titleAuthor)
  screen.debug(checkStyle)

  expect(titleAuthor).toHaveTextContent('Test Title')
  expect(titleAuthor).toHaveTextContent('Test Author')
  expect(checkStyle).toHaveStyle('display: none')
})
