import React from "react";

const Cart = ({
  cart,
  qyt,
  handelIncreaseQyt,
  handelDecreaseQyt,
  addQyt,
  handelDeleteFromCart,
  total,
}) => {
  return (
    <div>
      Number Elements Of Cart = [{addQyt}]
      {cart.length
        ? cart.map((c) => {
            return (
              <ul key={c.id}>
                <li>
                  {c.id} - {c.title} - {c.price} - {qyt} -total: {total}
                  <button onClick={() => handelIncreaseQyt(c.id)}>
                    +
                  </button> -{" "}
                  <button onClick={() => handelDecreaseQyt(c.id)}>-</button> -{" "}
                  <button
                    onClick={() => {
                      handelDeleteFromCart(c.id);
                    }}>
                    Delete
                  </button>
                </li>
              </ul>
            );
          })
        : "There is no item"}
    </div>
  );
};

export default Cart;
