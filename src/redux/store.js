import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
	reducer,
	devTools: true,
	middleware
});

export default store;
