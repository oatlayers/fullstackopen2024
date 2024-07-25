import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('form calls the event handler it received as props with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  const { container } = render(<NewBlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const saveButton = container.querySelector('#save')

  await user.type(titleInput, 'Test Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'www.testurl.com')

  await user.click(saveButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
  })
})
