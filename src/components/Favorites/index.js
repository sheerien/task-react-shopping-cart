import React from "react";

const Favorites = ({ favorites, handelDeleteFromFavorite }) => {
  console.log(favorites);
  return (
    <div>
      {favorites.length
        ? favorites.map((favorite) => {
            return (
              <ul key={favorite.id}>
                <li>
                  {favorite.id} - {favorite.title} - {favorite.price} -
                  <button
                    onClick={() => {
                      handelDeleteFromFavorite(favorite.id);
                    }}>
                    Remove
                  </button>
                </li>
              </ul>
            );
          })
        : "there is no item"}
    </div>
  );
};

export default Favorites;
