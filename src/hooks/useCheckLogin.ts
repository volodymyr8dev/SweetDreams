import { useEffect }   from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin }  from '../redux/slices/auth';

export const useCheckLogin: (object) => void = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};