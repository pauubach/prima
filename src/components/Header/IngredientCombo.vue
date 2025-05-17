<template>
  <Select
    :options="ingredients"
    v-model="selectedIngredient"
    optionLabel="strIngredient"
    optionValue="strIngredient"
    placeholder="Select an ingredient"
    class="w-full md:w-56"
    filter
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRecipesStore } from '@/stores/recipesStore'
import Select from 'primevue/select'

const recipesStore = useRecipesStore()
const { selectedIngredient, ingredients } = storeToRefs(recipesStore)
</script>
