import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload
    },
    clearNotification: (state) => {
      state.message = null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const changeNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
