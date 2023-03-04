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
  margin-bottom: 2px;
}
</style>
