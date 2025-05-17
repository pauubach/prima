<template>
  <DataTable
    stripedRows
    :value="recipes"
    scrollable
    scrollHeight="flex"
    tableStyle="min-width: 100%"
    @rowClick="onRowSelect"
    :loading="isLoadingRecipes"
  >
    <template #empty> Search for recipes using the search bar above. </template>
    <Column field="favorite" class="w-4">
      <template #body="slotProps">
        <Button
          icon="pi pi-star"
          severity="contrast"
          rounded
          :variant="slotProps.data.favorite ? '' : 'outlined'"
          aria-label="Favorite"
          @click.stop="toggleFavorite(slotProps.data.id)"
        />
      </template>
    </Column>
    <Column field="image" class="w-40">
      <template #body="slotProps">
        <img
          :src="`${slotProps.data.image}/small`"
          :alt="`${slotProps.data.name} Image`"
          class="h-32"
          loading="lazy"
          decoding="async"
        />
      </template>
    </Column>
    <Column field="name" header="Name">
      <template #body="slotProps">
        <div>
          <div>{{ slotProps.data.name }}</div>
          <div class="text-sm text-gray-500 mt-1 md:hidden">
            {{ cutDescription(slotProps.data.instructions) }}
          </div>
        </div>
      </template>
    </Column>
    <Column field="instructions" header="Instructions" class="hidden md:table-cell">
      <template #body="slotProps">
        {{ cutDescription(slotProps.data.instructions) }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { Button } from 'primevue'
import { useRecipesStore } from '@/stores/recipesStore'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import type { Recipe } from '@/types/recipes'

const recipesStore = useRecipesStore()

const route = useRoute()
const router = useRouter()

const { recipes, isLoadingRecipes, searchQuery, selectedIngredient, showingFavorites } =
  storeToRefs(recipesStore)
const { cutDescription, onRowSelect, toggleFavorite } = useRecipesTable()

onMounted(() => {
  if (
    route.name === 'RecipeListBySearch' &&
    route.params.search &&
    route.params.search.length > 0
  ) {
    searchQuery.value = route.params.search as string
  } else if (
    route.name === 'RecipeListByIngredient' &&
    route.params.ingredient &&
    route.params.ingredient.length > 0
  ) {
    selectedIngredient.value = route.params.ingredient as string
  } else if (route.name === 'RecipeListFavorites') {
    showingFavorites.value = true
  }
})

function useRecipesTable() {
  const toggleFavorite = (id: number) => {
    recipesStore.toggleFavorite(id)
  }

  const onRowSelect = (event: { data: Recipe }) => {
    router.push({ name: 'RecipeDetail', params: { id: event.data.id } })
  }

  const cutDescription = (description: string) => {
    let max = 100
    if (window.innerWidth < 768) {
      const minWidth = 500
      const maxWidth = 768
      const minMax = 120
      const maxMax = 420

      if (window.innerWidth <= minWidth) {
        max = minMax
      } else if (window.innerWidth < maxWidth) {
        // Linear interpolation between minMax and maxMax
        max = Math.round(
          minMax + ((window.innerWidth - minWidth) / (maxWidth - minWidth)) * (maxMax - minMax),
        )
      } else {
        max = maxMax
      }
    } else if (window.innerWidth >= 768) {
      const minWidth = 768
      const maxWidth = 1920
      const minMax = 200
      const maxMax = 960

      if (window.innerWidth <= minWidth) {
        max = minMax
      } else if (window.innerWidth < maxWidth) {
        // Linear interpolation between minMax and maxMax
        max = Math.round(
          minMax + ((window.innerWidth - minWidth) / (maxWidth - minWidth)) * (maxMax - minMax),
        )
      } else {
        max = maxMax
      }
    }

    if (description && description.length > max) {
      // Find the first space, comma, or dot after max
      const nextBreak = description.slice(max).search(/[^a-zA-Z0-9]/)
      if (nextBreak !== -1) {
        return description.substring(0, max + nextBreak) + '...'
      } else {
        return description
      }
    }
    return description
  }

  return { toggleFavorite, onRowSelect, cutDescription }
}
</script>

<style lang="scss" scoped>
:deep(.p-datatable-table) > tbody > tr {
  cursor: pointer;

  & > td[data-pc-section='emptymessagecell'] {
    text-align: center;
    padding-top: 2rem;
    cursor: default;
    border: 0;
  }
}
</style>
