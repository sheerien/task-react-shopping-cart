import React from "react";
import ProductList from "../ProductList";
import ZeroState from "../ZeroState";
const Products = ({
  items,
  handelDeleteItem,
  handelSearchInPut,
  searchValue,
  handelAddToFavorite,
  handelAddItemToCart,
  handelUpdateProduct,
}) => {
  //   console.log(items);
  return (
    <>
      <input
        type="text"
        placeholder="Search item "
        value={searchValue}
        onChange={handelSearchInPut}
      />
      <ul>
        {items.length ? (
          items
            .filter((item) => {
              if (searchValue == "") {
                return item;
              } else if (
                item.title
                  .toLowerCase()
                  .trim()
                  .includes(searchValue.toLowerCase().trim())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <ProductList
                  key={item.id}
                  singleItem={item}
                  handelDeleteItem={handelDeleteItem}
                  handelAddToFavorite={handelAddToFavorite}
                  handelAddItemToCart={handelAddItemToCart}
                  handelUpdateProduct={handelUpdateProduct}
                />
              );
            })
        ) : (
          <li>
            <ZeroState />
          </li>
        )}
      </ul>
    </>
  );
};

export default Products;
