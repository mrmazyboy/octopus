<template>
  <div class="container-fluid">
    <div class="container">
      <HeaderComponent />

      <div class="navigation">
        <NuxtLink class="navigation__link _favorites _btn" to="/favorites">
          <img
            class="navigation__link-icon"
            src="@/assets/icons/blue-heart.svg"
            alt="favorites"
          />
          Избраноое
        </NuxtLink>

        <NuxtLink class="navigation__link _main _btn" to="/">
          <img
            class="navigation__link-icon"
            src="@/assets/icons/box.svg"
            alt="stock"
          />
          Склад
        </NuxtLink>

        <NuxtLink class="navigation__link _disappears _btn" to="/disappears">
          <img
            class="navigation__link-icon"
            src="@/assets/icons/bag.svg"
            alt="disappers"
          />
          Сделки
        </NuxtLink>
      </div>

      <NuxtChild :is-loading="isLoading" :tab-list="tabList" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isLoading: false,
      tabList: [
        {
          id: 1,
          type: 'all',
          text: 'Все типы'
        },
        {
          id: 2,
          type: 'auction',
          text: 'Аукцион'
        },
        {
          id: 3,
          type: 'one-time-sell',
          text: 'Прямые продажи'
        }
      ]
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    ...mapActions(['fetchProducts']),

    async fetch() {
      this.isLoading = true;
      try {
        await this.fetchProducts();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/constants.scss';

.container-fluid {
  width: 100vw;
  background-color: $white;
  display: flex;
  justify-content: center;
}

.container {
  width: 1200px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: $desktop) {
    width: 1024px;
  }
  @media screen and (max-width: $laptop) {
    width: 768px;
  }
  @media screen and (max-width: $tablet) {
    width: 480px;
  }
  @media screen and (max-width: $mobile) {
    width: 100%;
  }
}

.navigation {
  margin-left: auto;
  margin-top: 20px;
  display: flex;
  margin-bottom: 77px;

  &__link-icon {
    width: 20px;
    height: 20px;
    margin-bottom: 4px;
  }

  &__link {
    padding: 6px 7px 7px 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: $border-radius;
    text-decoration: none;
    color: $dark-blue;
    font-weight: 500;
    font-size: 13px;
  }

  &__link:not(:last-child) {
    margin-right: 16px;
  }

  &__link.nuxt-link-exact-active {
    background-color: $gray;
  }
}
</style>
