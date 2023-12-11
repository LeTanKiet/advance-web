import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./redux/app/slice";
import classReducer from "./redux/class/slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    class: classReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
