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
  },
})

export const { createBlog, setBlogs } = blogSlice.actions

export const fetchBlogs = () => async (dispatch) => {
  const blogs = await service.getAll()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  dispatch(setBlogs(sortedBlogs))
}

export default blogSlice.reducer
