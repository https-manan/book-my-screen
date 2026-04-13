//Baki iss bar break me aache se phadna hai inke baare mai both the reducer and context api as interviewer can scratch the hell  

import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "../api/api";

export const appStore = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,  //This means all the api comes under reducer for this project in state.api 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
const initializeApp = async ()=>{
    await appStore.dispatch(appApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
}
initializeApp();