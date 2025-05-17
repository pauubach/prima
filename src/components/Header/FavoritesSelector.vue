<template>
  <div class="flex items-center">
    <Button
      icon="pi pi-star"
      severity="contrast"
      rounded
      :variant="showingFavorites ? '' : 'outlined'"
      aria-label="Favorite"
      class="!w-8 !h-8 flex-shrink-0"
      @click="goToFavs"
    />
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipesStore'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
const recipesStore = useRecipesStore()
const { showingFavorites } = storeToRefs(recipesStore)

const goToFavs = () => {
  recipesStore.showingFavorites = true
  router.push({ name: 'RecipeListFavorites' })
}
</script>
