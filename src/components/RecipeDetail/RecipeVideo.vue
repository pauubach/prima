<template>
  <Skeleton v-if="!videoLoaded" width="100%" height="315px"></Skeleton>
  <iframe
    v-show="videoLoaded"
    :src="videoUrl"
    width="100%"
    height="315"
    frameborder="0"
    allowfullscreen
    class="rounded-lg"
    @load="videoLoaded = true"
  ></iframe>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{ url: string }>()

const videoUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.url.split('v=')[1].split('&')[0]}`
})

const videoLoaded = ref(false)
</script>
