<template>
  <div>
    <div v-if="selectedRecipe" class="flex flex-col items-start p-4 md:p-8 gap-4">
      <div class="flex items-center w-full mb-1">
        <h4 class="text-2xl font-bold flex-1 text-primary-700">
          {{ selectedRecipe.name }}
          <a v-if="selectedRecipe.source" :href="selectedRecipe.source" target="_blank" rel="noopener noreferrer"
            class="link ml-2 text-primary-500 hover:text-primary-700" title="Open source in new window">
            <i class="pi pi-external-link text-primary-500"></i>
          </a>
        </h4>
        <Button icon="pi pi-star" severity="contrast" rounded :variant="selectedRecipe.favorite ? '' : 'outlined'"
          aria-label="Favorite" @click.stop="recipesStore.toggleFavorite(selectedRecipe.id)" />
      </div>
      <div class="w-full flex flex-col sm:flex-row gap-4">
        <div class="flex-1 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <template v-if="selectedRecipe.tags && selectedRecipe.tags.length">
              <Tag v-for="(tag, index) in selectedRecipe.tags" class="tag" :key="index" :value="tag" />
            </template>
          </div>
          <div v-if="selectedRecipe.category" class="flex items-center gap-2">
            <span class="font-semibold text-primary-700">Category:</span>
            <span class="category">{{ selectedRecipe.category }}</span>
          </div>
          <div v-if="selectedRecipe.area" class="flex items-center gap-2">
            <span class="font-semibold text-primary-700">Area:</span>
            <span class="area">{{ selectedRecipe.area }}</span>
          </div>
          <div v-if="selectedRecipe.youtube" class="mt-2 w-full hidden lg:block max-w-160">
            <RecipeVideo :url="selectedRecipe.youtube" />
          </div>
        </div>
        <div v-if="selectedRecipe.image" class="flex-shrink-0 flex flex-col gap-4 order-first sm:order-none"
          style="width: 12rem">
          <div class="flex w-full md:justify-end">
            <img :src="`${selectedRecipe.image}/medium`" alt="Recipe Image"
              class="recipe-image w-48 object-contain mb-4 block" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <div v-if="selectedRecipe.youtube" class="mt-2 w-full block lg:hidden">
        <RecipeVideo :url="selectedRecipe.youtube" />
      </div>
      <div class="w-full border-primary-500 border-t mt-4 pt-4">
        <RecipeIngredients :ingredients="selectedRecipe.ingredients || []" />
      </div>
      <div if="selectedRecipe.instructions" class="mt-4 border-primary-500 border-t pt-4">
        <span class="font-semibold text-primary-700">Instructions:</span>
        <p class="instructions mt-2 whitespace-pre-line" v-html="selectedRecipe.instructions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRecipesStore } from '@/stores/recipesStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Button, Tag } from 'primevue'
import RecipeIngredients from '@/components/RecipeDetail/RecipeIngredients.vue'
import RecipeVideo from '@/components/RecipeDetail/RecipeVideo.vue'

const recipesStore = useRecipesStore()
const { selectedRecipe } = storeToRefs(recipesStore)

const route = useRoute()
const rawId = ref(route.params.id)
const id = ref()

onMounted(() => {
  updateId(rawId.value)
})

watch(
  () => route.params.id,
  (newId) => {
    updateId(newId)
  },
)

const updateId = (newId: string | string[]) => {
  id.value = Array.isArray(newId) ? Number(newId[0]) : Number(newId)
  recipesStore.getRecipe(id.value)
}
</script>
