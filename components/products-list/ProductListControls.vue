<template>
  <div class="actions">
    <button
      v-if="isFavoritesPage"
      class="actions__controls-add-button actions__controls-favorites-button _btn"
      :class="{ _paid: product && product.isPaid }"
      @click="$emit('handlePay')"
    >
      <template v-if="product && product.isPaid"> Оплачено </template>

      <template v-else> Оплатить </template>
    </button>

    <button
      v-else
      class="actions__controls-add-button _btn"
      @click="$emit('handleAddToDisappears')"
    >
      <template v-if="isProductInDisappers"> Удалить из сделок </template>

      <template v-else> Добавить в сделки </template>
    </button>

    <button
      class="actions__favorite-button _btn"
      :class="{ active: isFavorites }"
      @click="$emit('handleAddToFavorites')"
    >
      <img
        v-if="isFavorites"
        src="@/assets/icons/white-heart.svg"
        alt="heart"
      />
      <img v-else src="@/assets/icons/blue-heart.svg" alt="heart" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    favoritesList: {
      type: Array,
      required: true
    },
    disappearsList: {
      type: Array,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    isFavorites() {
      const isFavoritesPage = this.$route.path === '/favorites';
      return (
        isFavoritesPage ||
        this.favoritesList.find((el) => el.id === this.product.id)
      );
    },

    isFavoritesPage() {
      return this.$route.path === '/favorites';
    },

    isDisappearsPage() {
      return this.$route.path === '/disappears';
    },

    isProductInDisappers() {
      return (
        !this.isFavoritesPage &&
        this.disappearsList.find((el) => el.id === this.product.id)
      );
    }
  }

  // methods: {
  //     handleAddToFavorites() {
  //         this.$emit('handleAddToFavorites')
  //     }
  // }
};
</script>

<style lang="scss" scoped>
@import '~/styles/constants.scss';

.actions {
  display: flex;
  margin-top: auto;
  justify-content: space-between;

  &__favorite-button {
    height: 40px;
    min-width: 40px;
    max-width: 40px;
    border-radius: $border-radius;
    background-color: $gray;
    transition: background-color 0.15s linear;
  }

  &__favorite-button.active {
    background-color: $dark-blue;
    transition: background-color 0.15s linear;
  }

  &__controls {
    margin-top: 200px;
    display: flex;
  }

  &__controls-add-button {
    font-weight: 600;
    height: 40px;
    margin-right: 12px;
    width: 100%;
    border-radius: $border-radius;
    font-size: 15px;
    color: $dark-blue;
  }

  &__controls-add-button._paid {
    pointer-events: none;
  }

  &__controls-favorites-button {
    background-color: $green;
    color: $white;
    border: 1px solid transparent;
  }

  &__controls-favorites-button._paid {
    background-color: $white;
    color: $light-gray;
    border: $base-border;
  }
}
</style>
