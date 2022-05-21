import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm create-button calls event-handler with right content', async () => {
  const mockHandler = jest.fn()

  render(<BlogForm handleCreateBlog={mockHandler} />)

  const user = userEvent.setup()
  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('Create')

  await user.type(inputs[0], 'a new blog')
  await user.type(inputs[1], 'John Doe')
  await user.type(inputs[2], 'yyy.yy')
  await user.click(createButton)

  expect(mockHandler.mock.calls[0][0].title).toBe('a new blog')
  expect(mockHandler.mock.calls[0][0].author).toBe('John Doe')
  expect(mockHandler.mock.calls[0][0].url).toBe('yyy.yy')
})
