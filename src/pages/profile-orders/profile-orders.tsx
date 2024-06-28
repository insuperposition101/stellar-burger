import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';

import { getFeedOrders, getUserOrders } from '../../services/feedSlice';

export const ProfileOrders: FC = () => {
  /** взять переменную из стора */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(getFeedOrders);

  return <ProfileOrdersUI orders={orders} />;
};
