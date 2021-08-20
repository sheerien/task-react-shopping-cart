import React, { Component } from "react";
// import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ProductForm from "./components/ProductForm";
import Products from "./components/Products";
import Favorites from "./components/Favorites";
import data from "./data";
import Cart from "./components/Cart";
import routes from "./MappingRouter";
import UpdateItem from "./components/UpdateItem";
let allData = JSON.parse(localStorage.getItem("data")) || data;
localStorage.setItem("data", JSON.stringify(allData));
export default class App extends Component {
  state = {
    products: allData,
    newTitle: "",
    newPrice: "",
    redirect: false,
    searchValue: "",
    favorites: [],
    cartItem: [],
    listItems: [],
    updateTitle: "",
    updatePrice: "",
  };

  handelChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handelAddItemSubmit = (e) => {
    e.preventDefault();
    this.setState(
      {
        products: [
          ...this.state.products,
          {
            id: this.state.products.length + 1,
            title: this.state.newTitle,
            price: `$${this.state.newPrice}`,
          },
        ],
        newTitle: "",
        newPrice: "",
      },
      () => {
        localStorage.setItem("data", JSON.stringify(this.state.products));
        this.setState({
          redirect: true,
        });
      }
    );
  };

  handelDeleteItem = (id) => {
    let products = [...this.state.products];
    let newProducts = products.filter((product) => product.id !== id);
    this.setState(
      {
        products: newProducts,
      },
      () => {
        localStorage.setItem("data", JSON.stringify(this.state.products));
      }
    );
  };

  handelSearchInPut = (e) => {
    this.setState({
      searchValue: e.target.value,
      search: true,
    });
  };

  handelAddToFavorite = (item) => {
    let { favorites } = this.state;
    if (!favorites.some((existedItem) => existedItem.id == item.id)) {
      this.setState({
        favorites: [...favorites, item],
      });
    }
  };

  handelDeleteFromFavorite = (id) => {
    let favorites = [...this.state.favorites];
    let newFavorites = favorites.filter((product) => product.id !== id);
    this.setState({
      favorites: newFavorites,
    });
  };

  handelAddItemToCart = (item) => {
    let { cartItem } = this.state;
    // console.log(item);
    let cartExistItem = cartItem.find((cItem) => cItem.id == item.id);
    if (cartExistItem) {
      let cartItems = cartItem.map((cItem) =>
        cItem.id == item.id
          ? {
              ...cartExistItem,
              qyt: cartExistItem.qyt + 1,
              total:
                Number(cartExistItem.qyt + 1) * Number(cartExistItem.price),
            }
          : cItem
      );
      this.setState({
        cartItem: cartItems,
      });
    } else {
      this.setState({
        cartItem: [...cartItem, { ...item, qyt: 1, total: Number(item.price) }],
      });
    }
  };

  handelDeleteItemToCart = (item) => {
    let { cartItem } = this.state;
    // console.log(item);
    let cartExistItem = cartItem.find((cItem) => cItem.id == item.id);
    if (cartExistItem.qyt == 1) {
      let cartItems = cartItem.filter((cItem) => cItem.id != item.id);
      this.setState({
        cartItem: cartItems,
      });
    } else {
      let cartItems = cartItem.map((cItem) =>
        cItem.id == item.id
          ? {
              ...cartExistItem,
              qyt: cartExistItem.qyt - 1,
              total:
                Number(cartExistItem.qyt - 1) * Number(cartExistItem.price),
            }
          : cItem
      );
      this.setState({
        cartItem: cartItems,
      });
    }
  };

  handelUpdateProduct = (item) => {
    let { listItems } = this.state;
    console.log(item);
    let listExistItem = listItems.find((lItem) => lItem.id == item.id);
    if (listExistItem) {
      return listExistItem;
    } else {
      this.setState(
        {
          listItems: [...listItems, { ...item }],
          redirect: true,
        },
        () => {
          this.setState({
            updateTitle: this.state.listItems.title,
            updatePrice: this.state.listItems.price,
          });
        }
      );
    }
  };

  handelUpdateChangeInput = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.state.redirect && <Redirect to="/products" />}

        <Switch>
          <Route path="/home" exact component={Home} />
          <Route
            path="/favorites"
            render={(props) => {
              return (
                <Favorites
                  {...props}
                  favorites={this.state.favorites}
                  handelDeleteFromFavorite={this.handelDeleteFromFavorite}
                />
              );
            }}
          />
          <Route
            path="/cart"
            render={(props) => {
              return (
                <Cart
                  {...props}
                  cartItem={this.state.cartItem}
                  handelAddItemToCart={this.handelAddItemToCart}
                  handelDeleteItemToCart={this.handelDeleteItemToCart}
                />
              );
            }}
          />
          <Route
            path="/update-product"
            render={(props) => {
              return (
                <UpdateItem
                  {...props}
                  listItems={this.state.listItems}
                  handelUpdateChangeInput={this.handelUpdateChangeInput}
                  updateTitle={this.state.updateTitle}
                  updatePrice={this.state.updatePrice}
                />
              );
            }}
          />
          <Route
            path="/products"
            render={(props) => {
              return (
                <Products
                  {...props}
                  items={this.state.products}
                  handelDeleteItem={this.handelDeleteItem}
                  handelSearchInPut={this.handelSearchInPut}
                  searchValue={this.state.searchValue}
                  handelSearchSubmit={this.handelSearchSubmit}
                  search={this.state.search}
                  handelAddToFavorite={this.handelAddToFavorite}
                  handelAddItemToCart={this.handelAddItemToCart}
                  handelDeleteItemToCart={this.handelDeleteItemToCart}
                  handelUpdateProduct={this.handelUpdateProduct}
                />
              );
            }}
          />
          <Route
            path="/add-product"
            render={(props) => {
              return (
                <ProductForm
                  handelChangeInput={this.handelChangeInput}
                  handelAddItemSubmit={this.handelAddItemSubmit}
                  newTitle={this.state.newTitle}
                  newPrice={this.state.newPrice}
                  {...props}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
