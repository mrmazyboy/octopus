<template>
  <div>
    <ControlsLayout>
      <TabsComponent v-model="activeTab" :tab-list="tabList" />

      <SearchComponent v-model="search" />
    </ControlsLayout>

    <ProductsListComponent
      v-if="activeTab"
      :products="filteredProducts"
      :is-loading="isLoading"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import productSearchMixin from '@/mixins/productsSearch';

export default {
  mixins: [productSearchMixin],

  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    ...mapState(['productsList']),
    ...mapGetters(['auctionProducts', 'oneTimeSellProducts']),

    currentProducts() {
      let products = null;

      if (this.activeTab === this.tabList[0].type) {
        products = this.productsList;
      } else if (this.activeTab === this.tabList[1].type) {
        products = this.auctionProducts;
      } else {
        products = this.oneTimeSellProducts;
      }

      return products;
    }
  }
};
</script>
