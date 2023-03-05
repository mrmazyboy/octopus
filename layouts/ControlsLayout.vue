<template functional>
  <div class="controls">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 767.98px) {
    flex-wrap: wrap;
  }
}
</style>
