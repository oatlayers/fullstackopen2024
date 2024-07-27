import { createSlice } from '@reduxjs/toolkit'
import service from '../services/service'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { createBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions

export const fetchBlogs = () => async (dispatch) => {
  const blogs = await service.getAll()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  dispatch(setBlogs(sortedBlogs))
}

export default blogSlice.reducer
