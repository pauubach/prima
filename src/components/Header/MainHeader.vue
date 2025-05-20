<template>
  <header class="!block md:!flex !bg-white dark:!bg-[rgb(18,18,18)] mt-4 mx-4 md:mx-8 !px-0">
    <div class="flex items-center">
      <PrimaLogo class="logo-prima" />
      <h1 class="mb-1 text-2xl font-semibold inline-block align-middle text-yellow-500">Cook</h1>
    </div>
    <div class="flex md:ml-12 mt-4 md:mt-0 max-w-180 w-full gap-4 justify-end">
      <IngredientCombo class="flex-2" />
      <SearchInput class="flex-3" />
      <FavoritesSelector />
    </div>
  </header>
</template>

<script setup lang="ts">
import SearchInput from '@/components/Header/SearchInput.vue'
import IngredientCombo from '@/components/Header/IngredientCombo.vue'
import FavoritesSelector from '@/components/Header/FavoritesSelector.vue'
import PrimaLogo from '@/assets/images/PrimaLogo.vue'
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f0f0f0;
}

.logo-prima {
  fill: rgb(131, 52, 194);
  width: 120px;
}
</style>
