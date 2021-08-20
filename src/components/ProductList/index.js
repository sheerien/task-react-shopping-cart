import React from "react";
import { strings } from "../../Constants";

const ProductList = ({
  singleItem,
  handelDeleteItem,
  handelAddToFavorite,
  handelAddItemToCart,
  handelUpdateProduct,
}) => {
  const { id, title, price } = singleItem;
  return (
    <li>
      {id} - {title} - {price} -
      <button onClick={() => handelDeleteItem(id)}>{strings.deleteItem}</button>
      -
      <button onClick={() => handelAddToFavorite(singleItem)}>
        {strings.addToFavorite}
      </button>
      -
      <button
        onClick={() => {
          handelAddItemToCart(singleItem);
        }}>
        {strings.addToCart}
      </button>
      -
      <button
        onClick={() => {
          handelUpdateProduct(singleItem);
        }}>
        {strings.updateItem}
      </button>
    </li>
  );
};

export default ProductList;
