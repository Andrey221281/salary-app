import { configureStore } from '@reduxjs/toolkit';
import salary from '../features/salarySlice';

const store = configureStore({
  reducer: salary,
});

// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type dispatch = ReturnType<typeof store.dispatch>;

export default store;
