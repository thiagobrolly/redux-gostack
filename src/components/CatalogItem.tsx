import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IState } from '../store';

interface CatalogItemProps {
  product: IProduct;
}

export function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  const hasfailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
      <strong>{product.title}</strong> {' - '}
      <span>{product.price}</span>{' '}
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      {hasfailedStockCheck && (
        <span style={{ color: '#f00' }}>Falta de estoque</span>
      )}
    </article>
  );
}
