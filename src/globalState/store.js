import { configureStore } from '@reduxjs/toolkit'

import userReducer from './login/loginSlice'



export const store = configureStore({
  reducer: {
    user: userReducer, 
   

  },
})
