import { configureStore } from '@reduxjs/toolkit';
import product from './productSlice'
import index from './indexSlice'
import mode from './modeSlice'


// main store config
const store = configureStore({
  reducer: {
    product,
    index,
    mode
  },
});

export default store;
