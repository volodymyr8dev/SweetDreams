import { useEffect }   from 'react';
import { useDispatch } from 'react-redux';
import { setEmail, resetEmail }  from '../redux/slices/forgotPassword';

export const useSetEmail: (email) => void = (email) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEmail(email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useResetEmail: () => void = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(resetEmail());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  };