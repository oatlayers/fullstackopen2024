import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteSlice'
import anecdoteFilterReducer from './reducers/filterSlice'
import notificationSlice from './reducers/notificationSlice'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: anecdoteFilterReducer,
      notification: notificationSlice
    }
})

export default store