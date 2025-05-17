<template>
  <span class="font-semibold text-primary-700">Ingredients:</span>
  <div class="grid gap-2 mt-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div v-for="(ingredient, idx) in ingredients" :key="idx">
      <span class="mr-4">{{ ingredient.ingredient }}</span>
      <br class="block sm:hidden" />
      <span v-if="ingredient.measure" class="text-gray-500">({{ ingredient.measure }})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ingredient } from '@/types/recipes'

defineProps<{ ingredients: Ingredient[] }>()
</script>
