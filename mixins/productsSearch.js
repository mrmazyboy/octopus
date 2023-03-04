import ControlsLayout from '@/layouts/ControlsLayout.vue';

export default {
  components: {
    ControlsLayout
  },

  props: {
    tabList: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      activeTab: 'all',
      search: ''
    };
  },

  computed: {
    filteredProducts() {
      return this.currentProducts.filter(
        (el) =>
          el.name.toLowerCase().includes(this.search.toLocaleLowerCase()) ||
          el.city.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    }
  }
};
