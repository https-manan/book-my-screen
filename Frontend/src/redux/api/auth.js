import { createSlice } from "@reduxjs/toolkit";

// const storedUser = localStorage.getItem("user");  ise baad mai implement

const initialState = {
    isAuthenticated:false,
    user:null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = action.payload.auth;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;