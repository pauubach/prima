<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <MainHeader />
    <div style="flex: 1; display: flex; flex-direction: column; min-height: 0">
      <router-view v-slot="{ Component }">
        <transition :name="animation">
          <KeepAlive>
            <component :is="Component" style="flex: 1 1 auto; min-height: 0" />
          </KeepAlive>
        </transition>
      </router-view>
    </div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import MainHeader from '@/components/Header/MainHeader.vue'
import Toast from 'primevue/toast'

const router = useRouter()

const animation = ref('')

watch(
  () => router.currentRoute.value.name,
  (newName) => {
    if (newName === 'RecipeDetail') {
      animation.value = 'slide-right'
    } else if (newName !== 'RecipeDetail' && animation.value !== '') {
      animation.value = 'slide-left'
    }
  },
)
</script>

<style scoped language="scss">
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: translate 0.3s ease-in-out;
}

.slide-right-enter-from {
  translate: 100% 0;
}

.slide-right-enter-to {
  translate: 0 0;
}

.slide-right-leave-from {
  translate: 0 0;
}

.slide-right-leave-to {
  translate: -100% 0;
}

.slide-left-enter-from {
  translate: -100% 0;
}

.slide-left-enter-to {
  translate: 0 0;
}

.slide-left-leave-from {
  translate: 0 0;
}

.slide-left-leave-to {
  translate: 100% 0;
}
</style>
