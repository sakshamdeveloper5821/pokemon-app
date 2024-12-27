import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
 
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
 
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type RootState= ReturnType<typeof store.getState>;
 