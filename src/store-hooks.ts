import { useDispatch } from 'react-redux';
import { AppDispatch } from './core/create-store';

export const useAppDispatch = useDispatch<AppDispatch>;
