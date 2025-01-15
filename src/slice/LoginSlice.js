import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, removeCookie, setCookie } from '../util/cookieUtil';
import { loginPost } from '../api/loginApi';
import useCustomPageMove from '../hooks/CustomPageMove';

const initState = {
  email: '',
  password: '',
};

export const loadMemberCookie = () => {
  const memberInfo = getCookie('member');
  return memberInfo;
};

export const loginPostAsynch = createAsyncThunk('loginPostAsynch', (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log('login reducer login');
      const data = action.payload;
      setCookie('member', JSON.stringify(data), 1);
      return { email: data.email };
    },
    logout: (state, action) => {
      console.log('login reducer logout');
      removeCookie('member');
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsynch.fulfilled, (state, action) => {
        console.log('ex reducers fulfilled');
        const payload = action.payload;
        setCookie('member', JSON.stringify(payload), 1);
        return payload;
      })
      .addCase(loginPostAsynch.pending, (state, action) => {
        console.log('ex reducers pending');
      })
      .addCase(loginPostAsynch.rejected, (state, action) => {
        console.log('ex reducers rejected');
      });
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
