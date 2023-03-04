<template>
  <div>
    <ControlsLayout>
      <TabsComponent v-model="activeTab" :tab-list="tabList" />

      <SearchComponent v-model="search" />
    </ControlsLayout>

    <ProductsListComponent v-if="activeTab" :products="filteredProducts" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import productSearchMixin from '@/mixins/productsSearch';

export default {
  mixins: [productSearchMixin],

  computed: {
    ...mapState(['favoritesList']),
    ...mapGetters(['auctionFavorites', 'oneTimeSellFavorites']),

    currentProducts() {
      let products = null;

      if (this.activeTab === this.tabList[0].type) {
        products = this.favoritesList;
      } else if (this.activeTab === this.tabList[1].type) {
        products = this.auctionFavorites;
      } else {
        products = this.oneTimeSellFavorites;
      }

      return products;
    }
  }
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}
</style>
