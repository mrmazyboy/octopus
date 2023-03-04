<template>
  <div class="product">
    <template v-if="isLoading">
      <div class="product__loader">Загрузка данных</div>
    </template>

    <template v-else>
      <div v-for="product in products" :key="product.id" class="product__item">
        <div class="product__info">
          <!-- <img class="product__img" :src="product.img" alt="prodcut" /> -->
          <img
            class="product__img"
            src="@/assets/images/product.png"
            alt="prodcut"
          />
          <div class="product__description">
            <div class="product__type">
              {{ product.typeId | productTypeText }}
            </div>
            <div class="product__name">{{ product.name }}</div>
            <div class="product__city">
              <img
                class="product__city-img"
                src="@/assets/icons/geo.svg"
                alt="geo"
              />
              {{ product.city }}
            </div>
            <div class="product__seller">
              <div class="product__seller-title">Продавец</div>
              <div class="product__seller-name">
                {{ product.seller }}
              </div>
            </div>
            <div class="product__type-of-goods">
              <div class="product__type-of-goods-title">Вид товара</div>
              <div class="product__type-of-goods-name">
                {{ product.typeOfGoods }}
              </div>
            </div>
            <div class="product__text">{{ product.description }}</div>
          </div>
        </div>

        <div class="product__actions">
          <div class="product__price">{{ product.price }} &#8381;</div>
          <div class="product__count">
            <div class="product__count-text">Количество</div>
            <div class="product__count-number">{{ product.count }} шт.</div>
          </div>
          <CostPerPiece
            :product-count="product.count"
            :product-price="product.price"
          />

          <ProductListControls
            :favorites-list="favoritesList"
            :product="product"
            :disappears-list="disappearsList"
            @handlePay="handlePay(product.id)"
            @handleAddToFavorites="handleAddToFavorites(product)"
            @handleAddToDisappears="handleAddToDisappears(product)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { PRODUCT_TYPES } from '~/constants/productTypes';
import ProductListControls from '~/components/products-list/ProductListControls';

const CostPerPiece = Vue.component('CostPerPiece', {
  props: ['productCount', 'productPrice'],
  render(h) {
    return h('div', { attrs: { class: 'product__count' } }, [
      h('div', {
        attrs: { class: 'product__count-text' },
        domProps: { innerHTML: 'Стоимость за штуку' }
      }),
      h('div', {
        style: { color: '#2D3B87' },
        attrs: { class: 'product__count-number' },
        domProps: {
          innerHTML:
            (this.productPrice / this.productCount).toFixed(0) + '&#8381'
        }
      })
    ]);
  }
});

export default {
  filters: {
    productTypeText(value) {
      return PRODUCT_TYPES[value];
    }
  },

  components: {
    CostPerPiece,
    ProductListControls
  },

  props: {
    products: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    ...mapState(['productsList', 'favoritesList', 'disappearsList']),
    ...mapGetters([
      'auctionProducts',
      'oneTimeSellProducts',
      'auctionFavorites',
      'oneTimeSellFavorites',
      'auctionDisappears',
      'oneTimeSellDisapears'
    ]),

    isFavorites() {
      return this.$route.path === '/favorites';
    },

    isPaid() {
      return true;
    }
  },

  methods: {
    ...mapMutations(['setFavorites', 'setDisappears', 'payForTheProduct']),
    handleAddToDisappears(product) {
      this.setDisappears(product);
    },

    handleAddToFavorites(product) {
      this.setFavorites(product);
    },

    handlePay(productId) {
      this.payForTheProduct(productId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/styles/constants.scss';

.product {
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    border: $base-border;
    margin-top: 35px;
    height: 100px;
    font-size: 25px;
    color: $light-blue;
    font-weight: 500px;
    border-radius: $large-border-radius;
  }

  &__item {
    display: flex;
    border: $base-border;
    border-radius: $large-border-radius;
    margin-top: 34px;
    color: $light-gray;
    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }
  }

  &__info {
    display: flex;
    padding: 20px;

    @media screen and (max-width: $laptop) {
      flex-direction: column;
    }
  }

  &__img {
    border-radius: $border-radius;
    min-height: 256px;
    max-height: 256px;
    min-width: 256px;
    max-width: 256px;
  }

  &__description {
    padding: 0 20px;
    @media screen and (max-width: $laptop) {
      padding: 10px 0;
    }
  }

  &__type {
    font-weight: 400;
    font-size: 13px;
    margin: 3.5px 0;
  }

  &__name {
    margin-top: 12px;
    font-weight: 500;
    font-size: 15px;
    color: $dark-blue;
  }

  &__city {
    margin-top: 28px;
    display: flex;
    align-items: center;
    border-radius: $small-border-radius;
    background-color: $gray;
    white-space: nowrap;
    width: min-content;
    font-weight: 400;
    font-size: 13px;
    color: $light-blue;
    padding: 4.5px 8px 4.5px 10.5px;
    margin-bottom: 12px;
  }

  &__city-img {
    margin-right: 4px;
  }

  &__seller {
    display: flex;
    font-weight: 400;
    font-size: 13px;
    margin-bottom: 12px;
  }

  &__seller-title {
    margin-right: 4px;
  }

  &__seller-name {
    color: $black;
  }

  &__type-of-goods {
    padding: 8px;
    border-radius: $border-radius;
    background-color: $gray;
    width: min-content;
    font-weight: 400;
    font-size: 13px;
    margin-bottom: 12px;
  }

  &__type-of-goods-title {
    margin-bottom: 6px;
    color: $light-gray;
  }

  &__type-of-goods-name {
    color: $light-blue;
  }

  &__text {
    font-weight: 400;
    font-size: 13px;
    color: $dark-blue;
    line-height: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__actions {
    min-width: 274px;
    border-top-left-radius: $large-border-radius;
    border-bottom-left-radius: $large-border-radius;
    border-left: $base-border;
    padding: 20px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: $tablet) {
      // outline: 1px solid green;
      border-left: none;
      border-top: $base-border;
      border-top-left-radius: $large-border-radius;
      border-top-right-radius: $large-border-radius;
    }
    // @media screen and (max-width: $mobile) {
    //   width: 100%;
    // }
  }

  &__price {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 8px;
    color: $black;
  }

  &__count {
    line-height: 24px;
    display: flex;
    justify-content: space-between;
  }

  &__count-text {
    color: $light-gray;
  }

  &__count-number {
    color: $black;
  }
}
</style>
