import { useEffect }   from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeviceConfig }  from '../redux/slices/auth';

export const useFetchDeviceConfig: (object) => void = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDeviceConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};