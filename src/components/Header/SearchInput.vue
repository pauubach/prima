<template>
  <FloatLabel>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText class="w-full" v-model="searchQuery" placeholder="Search" />
    </IconField>
  </FloatLabel>
</template>

<script setup lang="ts">
import { InputIcon, InputText, IconField, FloatLabel } from 'primevue'

import { useRecipesStore } from '@/stores/recipesStore'
import { storeToRefs } from 'pinia'

const recipesStore = useRecipesStore()
const { searchQuery } = storeToRefs(recipesStore)
</script>
