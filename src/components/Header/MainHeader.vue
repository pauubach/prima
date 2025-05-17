<template>
  <header class="!block md:!flex !bg-white mt-4 mx-4 md:mx-8 !px-0">
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
import { computed } from 'vue'
import { Button } from 'primevue'
import SearchInput from '@/components/Header/SearchInput.vue'
import IngredientCombo from '@/components/Header/IngredientCombo.vue'
import FavoritesSelector from '@/components/Header/FavoritesSelector.vue'
import { useRouter, useRoute } from 'vue-router'
import PrimaLogo from '@/assets/images/PrimaLogo.vue'

const router = useRouter()
const route = useRoute()

// Botón de atrás solo visible en la vista de detalle
const showBackButton = computed(() => route.name === 'RecipeDetail')

const goBack = () => {
  router.go(-1) // Navegar a la página anterior en el historial
}
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
