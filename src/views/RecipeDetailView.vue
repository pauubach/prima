<template>
  <div class="flex justify-start mb-2 mx-4 md:mx-8">
    <Button icon="pi pi-arrow-left" label="Back" class="p-button-text" style="color: #000; border-color: #000"
      @click="back()" />
  </div>
  <div class="flex-1 flex flex-col">
    <RecipeDetail class="my-4 border mx-4 md:mx-8 border-yellow-500 rounded-xs flex-1 h-full" />
  </div>
</template>

<script setup lang="ts">
import RecipeDetail from '@/components/RecipeDetail.vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  const referrer = document.referrer
  const currentOrigin = window.location.origin
  if (window.history.length > 1 && referrer && referrer.startsWith(currentOrigin)) {
    router.go(-1)
  } else {
    router.replace({ name: 'RecipeList' })
  }
}
</script>
