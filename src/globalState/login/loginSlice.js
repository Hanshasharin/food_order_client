
import { createSlice } from '@reduxjs/toolkit';

// 🔁 Load user data from localStorage if available
const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isLoggedin: !!storedUser, // true if user exists in localStorage
  profile_pic: storedUser?.profile_pic || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ✅ Called after successful login
    updateUser(state, action) {
      const { profile_pic } = action.payload;
      state.isLoggedin = true;
      state.profile_pic = profile_pic;

      // 💾 Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

  logout(state) {
      state.isLoggedin = false;
      state.profile_pic = '';

      // 🧹 Remove from localStorage
      localStorage.removeItem('user');
    },
  },
});

export const { updateUser,logout } = userSlice.actions;
export default userSlice.reducer;
