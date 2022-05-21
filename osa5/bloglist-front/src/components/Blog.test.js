import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'hello world',
  author: 'foobar',
  url: 'nnn',
  likes: 3,
  user: {
    name: 'Ada L',
    username: 'Ada',
  },
}

const dummyUser = { username: 'Ada' }
const dummyFunc = jest.fn()
let container

beforeEach(() => {
  container = render(
    <Blog
      blog={blog}
      user={dummyUser}
      handleLike={dummyFunc}
      handleRemove={dummyFunc}
    />
  ).container
})

test('limited view renders title and author, not url and likes', () => {
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('hello world; foobar')
  expect(div).not.toHaveTextContent('nnn')
  expect(div).not.toHaveTextContent('Likes')
})

test('after clicking "view" renders url and likes', async () => {
  const div = container.querySelector('.blog')
  const user = userEvent.setup()
  const button = screen.getByText('View')

  await user.click(button)

  expect(div).toHaveTextContent('nnn')
  expect(div).toHaveTextContent('Likes: 3')
})

test('after clicking like-button twise, event handler is called twise', async () => {
  const user = userEvent.setup()
  const viewButton = screen.getByText('View')

  await user.click(viewButton)

  const likeButton = screen.getByText('Like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(dummyFunc.mock.calls).toHaveLength(2)
})
