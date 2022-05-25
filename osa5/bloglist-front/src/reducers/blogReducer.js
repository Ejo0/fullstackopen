import blogsService from '../services/blogs'
import { showNotification } from './notificationReducer'

const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  data: blogs,
})

const updateBlog = (blog) => ({
  type: 'UPDATE_BLOG',
  data: blog,
})

const removeBlog = (blog) => ({
  type: 'REMOVE_BLOG',
  data: blog,
})

const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  data: blog,
})

const orderedByLikes = (state) => state.sort((a, b) => b.likes - a.likes)

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS': {
      return orderedByLikes(action.data)
    }
    case 'UPDATE_BLOG': {
      const updated = action.data
      return orderedByLikes(
        state.map((b) => (b.id !== updated.id ? b : updated))
      )
    }
    case 'REMOVE_BLOG': {
      const removed = action.data
      return orderedByLikes(state.filter((b) => b.id !== removed.id))
    }
    case 'ADD_BLOG': {
      return state.concat(action.data)
    }
    default:
      return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogsService.like(blog)
    dispatch(updateBlog(likedBlog))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogsService.comment(blog, comment)
    dispatch(updateBlog(commentedBlog))
  }
}

export const remove = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const responseStatus = await blogsService.remove(blog)
      if (responseStatus === 204) {
        dispatch(removeBlog(blog))
        dispatch(showNotification('Blog removed', 4))
      }
      if (responseStatus === 401) {
        dispatch(showNotification('Unauthorized', 4, 'error'))
      }
    }
  }
}

export const create = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogsService.create(newBlog)
      dispatch(addBlog(createdBlog))
      dispatch(
        showNotification(
          `Created new blog '${createdBlog.title}' by ${createdBlog.author}`,
          5
        )
      )
      return true
    } catch (exception) {
      dispatch(showNotification('Title, author and url required', 4, 'error'))
      return false
    }
  }
}

export default blogReducer
