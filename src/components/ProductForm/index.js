import React from "react";

const ProductForm = ({
  handelChangeInput,
  handelAddItemSubmit,
  newTitle,
  newPrice,
}) => {
  return (
    <form onSubmit={handelAddItemSubmit}>
      <input
        type="text"
        id="newTitle"
        value={newTitle}
        onChange={handelChangeInput}
      />
      <input
        type="number"
        id="newPrice"
        value={newPrice}
        onChange={handelChangeInput}
      />
      <input type="submit" />
    </form>
  );
};

export default ProductForm;
