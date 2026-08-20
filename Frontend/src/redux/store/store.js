import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "../api/api";
import authReducer from "../api/auth.js";

export const appStore = configureStore({
  reducer: {
    auth:authReducer,
    [appApi.reducerPath]: appApi.reducer,  //This means all the api comes under reducer for this project in state.api 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
const initializeApp = async ()=>{
    await appStore.dispatch(appApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
}
initializeApp();