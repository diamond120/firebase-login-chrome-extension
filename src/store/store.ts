import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import root reducer

const store = configureStore({
  reducer: rootReducer
  // Add middleware here if needed
});

export default store;
