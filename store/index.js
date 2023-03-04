import Vue from 'vue';
import products from '../mock-data/products';
import { PRODUCT_TYPES } from '../constants/productTypes';

const productsFilter = (list, typeId) => {
  return list.filter((product) => product.typeId === typeId);
};

const { AUCTION, ONE_TIME_SELL } = PRODUCT_TYPES;

export const state = () => ({
  productsList: [],

  favoritesList: [],

  disappearsList: []
});

export const getters = {
  auctionProducts({ productsList }) {
    return productsFilter(productsList, AUCTION);
  },

  oneTimeSellProducts({ productsList }) {
    return productsFilter(productsList, ONE_TIME_SELL);
  },

  auctionFavorites({ favoritesList }) {
    return productsFilter(favoritesList, AUCTION);
  },

  oneTimeSellFavorites({ favoritesList }) {
    return productsFilter(favoritesList, ONE_TIME_SELL);
  },

  auctionDisappears({ disappearsList }) {
    return productsFilter(disappearsList, AUCTION);
  },

  oneTimeSellDisapears({ disappearsList }) {
    return productsFilter(disappearsList, ONE_TIME_SELL);
  }
};

export const mutations = {
  setProducts(state, products) {
    state.productsList = products;
  },

  setFavoritesOrDisapears(_, [list, product]) {
    const productDublicateIndex = list.findIndex((el) => el.id === product.id);

    if (productDublicateIndex !== -1) {
      list.splice(productDublicateIndex, 1);
    } else {
      list.push(product);
    }
  },

  setFavorites({ favoritesList }, product) {
    this.commit('setFavoritesOrDisapears', [favoritesList, product]);
  },

  setDisappears({ disappearsList }, product) {
    this.commit('setFavoritesOrDisapears', [disappearsList, product]);
  },

  payForTheProduct(state, productId) {
    state.favoritesList.forEach((el) => {
      if (el.id === productId) {
        Vue.set(el, 'isPaid', true);
      }
    });
  }
};

export const actions = {
  async fetchProducts({ commit }) {
    const sleep = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    try {
      const { data } = await sleep.then(() => products);
      commit('setProducts', data);
    } catch (e) {
      throw new Error(e);
    }
  }
};
