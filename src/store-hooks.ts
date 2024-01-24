import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './core/create-store';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector = <T>() => useSelector<RootState, T>;
