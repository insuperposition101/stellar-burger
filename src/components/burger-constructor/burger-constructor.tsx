import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getOrderRequest,
  createNewOrder,
  getOrderModalData,
  resetOrder
} from '../../services/newOrderSlice';

import { resetConstructor } from '../../services/constructorSlice';
import { isAuthCheckedSelector } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  /** взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const constructorItems = useSelector((state) => state.constructorSlice);

  const isAuthChecked = useSelector(isAuthCheckedSelector);

  const onOrderClick = () => {
    if (!isAuthChecked) {
      navigate('/login');
      return;
    } else if (constructorItems.bun && constructorItems.ingredients.length) {
      const data = [
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ];
      dispatch(createNewOrder(data));
    }
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
