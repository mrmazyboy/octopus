<template>
  <div class="tabs">
    <input
      id="all"
      v-model="activeTab"
      class="tabs__item"
      type="radio"
      name="contact"
      value="all"
    />
    <label class="tabs__label _btn" for="all">Все типы</label>

    <input
      id="one-time-sell"
      v-model="activeTab"
      class="tabs__item"
      type="radio"
      name="contact"
      value="one-time-sell"
    />
    <label class="tabs__label _btn" for="one-time-sell">Прямые продажи</label>

    <input
      id="auction"
      v-model="activeTab"
      class="tabs__item"
      type="radio"
      name="contact"
      value="auction"
    />
    <label class="tabs__label _btn" for="auction">Аукцион</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },

    tabList: {
      type: Array,
      required: true
    }
  },

  computed: {
    activeTab: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);
      }
    }
  },

  mounted() {
    this.$emit('input', 'all');
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/constants.scss';
.tabs {
  border-radius: $border-radius;
  border: $base-border;
  height: min-content;
  width: min-content;
  display: flex;
  background-color: $gray;
  font-weight: 400;
  font-size: 15px;
  color: $light-gray;
  overflow: hidden;

  &__label {
    white-space: nowrap;
    padding: 12px;
  }

  &__item:checked + .tabs__label {
    color: $black;
  }

  &__item[type='radio'] {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    margin: 0;
  }
}
</style>
