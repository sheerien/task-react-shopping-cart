import React from "react";
import ZeroState from "../ZeroState";

const Favorites = ({ favorites, handelDeleteFromFavorite }) => {
  console.log(favorites);
  return (
    <div>
      {favorites.length ? (
        favorites.map((favorite) => {
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
      ) : (
        <ZeroState />
      )}
    </div>
  );
};

export default Favorites;
