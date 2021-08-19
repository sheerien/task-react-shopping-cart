import React from "react";
import { strings } from "../../Constants";

const ProductList = ({
  singleItem,
  handelDeleteItem,
  handelAddToFavorite,
  handelAddItemToCart,
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
    </li>
  );
};

export default ProductList;
