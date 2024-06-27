import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser } from '../../services/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  return <AppHeaderUI userName={user?.name} />;
};
