import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import productReducer from './slices/ProductSlice';
import categoriesReducer from './slices/CategoriesSlice';
import filterReducer, { initialState } from './slices/FilterSlice';
import sortReducer from './slices/SortSlice';
import cartReducer from './slices/CartSlice';
import searchReducer from './slices/SearchSlice';
// export const store = configureStore({
//   reducer: {
//     grid: productReducer,
//     category: categoriesReducer,
//     filter: filterReducer,
//     sort: sortReducer,
//     cart:cartReducer
//   },
// });

const rootReducer = combineReducers({
  grid: productReducer,
  category: categoriesReducer,
  filter: filterReducer,
  sort: sortReducer,
  cart: cartReducer,
  search: searchReducer,
});

export const setupStore  = (preloadedState?:  Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']