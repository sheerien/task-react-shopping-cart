import React from "react";
import ZeroState from "../ZeroState";

function UpdateItem({
  listItems,
  handelUpdateChangeInput,
  updateTitle,
  updatePrice,
}) {
  console.log("update-product", listItems);
  console.log("updateTitle", updateTitle);
  console.log("updatePrice", updatePrice);
  return (
    <div>
      {listItems.length ? (
        listItems.map((item) => {
          return (
            <div key={item.id}>
              <form>
                <input
                  type="text"
                  id="updateTitle"
                  value={item.title}
                  onChange={handelUpdateChangeInput}
                />
                <input
                  type="number"
                  id="updatePrice"
                  value={item.price}
                  onChange={handelUpdateChangeInput}
                />
                <input type="submit" value="Update" />
              </form>
            </div>
          );
        })
      ) : (
        <ZeroState />
      )}
    </div>
  );
}

export default UpdateItem;
