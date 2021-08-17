import React from "react";

const ProductList = ({
  singleItem,
  handelDeleteItem,
  handelAddToFavorite,
  handelAddToCart,
}) => {
  const { id, title, price } = singleItem;
  return (
    <li>
      {id} - {title} - {price} -
      <button onClick={() => handelDeleteItem(id)}>Delete</button>-
      <button onClick={() => handelAddToFavorite(singleItem)}>
        Add-To-Favorite
      </button>
      -
      <button
        onClick={() => {
          handelAddToCart(singleItem);
        }}>
        Add To Cart
      </button>
    </li>
  );
};

export default ProductList;
