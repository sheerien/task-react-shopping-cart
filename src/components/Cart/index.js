import React from "react";
import ZeroState from "../ZeroState";

function Cart({ cartItem, handelAddItemToCart, handelDeleteItemToCart }) {
  let total = cartItem.reduce((a, item) => a + item.total, 0);
  return (
    <div>
      {cartItem.length ? ` ItemsCount: ${cartItem.length}` : ""}
      {cartItem.length ? (
        cartItem.map((item) => {
          return (
            <ul key={item.id}>
              <li>
                {item.title} {item.qyt} X {item.price}{" "}
                <button onClick={() => handelAddItemToCart(item)}>+</button>{" "}
                <button onClick={() => handelDeleteItemToCart(item)}>-</button>
              </li>
            </ul>
          );
        })
      ) : (
        <ZeroState />
      )}
      {cartItem.length ? ` Total: ${total}` : ""}
    </div>
  );
}

export default Cart;
