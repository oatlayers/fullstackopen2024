import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not its URL or number of likes by default', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    user: { name: 'oatlayers4' },
  }

  const { container } = render(<Blog blog={blog} />)
  const titleAuthor = container.querySelector('#title-author')
  const checkStyle = container.querySelector('#content')

  expect(titleAuthor).toHaveTextContent('Test Title')
  expect(titleAuthor).toHaveTextContent('Test Author')
  expect(checkStyle).toHaveStyle('display: none')
})

test('URL and number of likes are shown when button is clicked', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 4,
    user: { name: 'oatlayers4' },
  }

  const { container } = render(<Blog blog={blog} />)

  const button = container.querySelector('#view-button')
  const checkStyle = container.querySelector('#content')
  const user = userEvent.setup()

  expect(checkStyle).toHaveStyle('display: none')
  await user.click(button)
  expect(checkStyle).toHaveStyle('display: block')
})

test('like button is clicked twice, props is called twice', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 4,
    user: { name: 'oatlayers4', id: '65275bskdbskgh' },
  }

  const mockHandler = vi.fn()
  const { container } = render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      id={blog.user.id}
      user={blog.user.name}
    />,
  )

  const button = container.querySelector('#likes-button')
  const user = userEvent.setup()

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
