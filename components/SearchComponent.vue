<template>
  <div class="search" @keydown.enter="handleEnter">
    <input
      v-model="search"
      class="search__input"
      placeholder="Введите название товара"
      type="text"
    />
    <button class="search__button _btn" @click="handleClick">
      <img src="@/assets/icons/white-search.svg" alt="search" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    };
  },

  methods: {
    handleClick() {
      this.$emit('input', this.search);
    },

    handleEnter() {
      this.handleClick();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/constants.scss';

.search {
  height: 48px;
  display: flex;
  position: relative;

  &__input {
    max-width: 274px;
    border-radius: $border-radius;
    border: $base-border;
    font-weight: 400;
    font-size: 15px;
    padding-right: 52px;
    padding-left: 20px;
    color: $dark-blue;
  }

  &__input::placeholder {
    color: $light-gray;
  }

  &__input:focus {
    outline: 1px solid $black;
  }

  &__button {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 4px;
    top: 4px;
    background-color: $dark-blue;
    border-radius: $border-radius;
  }
}
</style>
