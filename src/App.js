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
    cart: [],
    addQyt: 0,
    qyt: 0,
    total: 0,
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

  handelAddToCart = (item) => {
    let { cart } = this.state;
    let existedItemInCart = cart.find(
      (existedItem) => existedItem.id === item.id
    );
    if (!existedItemInCart) {
      this.setState({
        cart: [...cart, item],
        addQyt: this.state.addQyt + 1,
      });
    }
  };

  handelIncreaseQyt = (id) => {
    let { cart, total } = this.state;
    let existedItemInCart = cart.find((existedItem) => existedItem.id === id);
    let tt = parseInt(existedItemInCart.price);
    console.log(typeof tt);
    console.log(typeof total);
    if (existedItemInCart) {
      this.setState({
        qyt: this.state.qyt + 1,
        total: total + tt,
      });
    }
  };
  handelDecreaseQyt = () => {
    this.setState({
      qyt: this.state.qyt > 0 ? this.state.qyt - 1 : 0,
    });
  };

  handelDeleteFromCart = (id) => {
    let cart = [...this.state.cart];
    let newCart = cart.filter((product) => product.id !== id);
    this.setState({
      cart: newCart,
      addQyt: this.state.addQyt > 0 ? this.state.addQyt - 1 : 0,
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
                  cart={this.state.cart}
                  qyt={this.state.qyt}
                  addQyt={this.state.addQyt}
                  total={this.state.total}
                  handelIncreaseQyt={this.handelIncreaseQyt}
                  handelDecreaseQyt={this.handelDecreaseQyt}
                  handelDeleteFromCart={this.handelDeleteFromCart}
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
                  handelAddToCart={this.handelAddToCart}
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
