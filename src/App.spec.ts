import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

// Mock components
vi.mock('@/components/Header/MainHeader.vue', () => ({
  default: { template: '<div class="main-header-mock"></div>' },
}))
vi.mock('primevue/toast', () => ({
  default: { template: '<div class="toast-mock"></div>' },
}))

const DummyComponent = { template: '<div>Dummy</div>' }
const RecipeDetailComponent = { template: '<div>RecipeDetail</div>' }

const routes = [
  { path: '/', name: 'Home', component: DummyComponent },
  { path: '/recipe/:id', name: 'RecipeDetail', component: RecipeDetailComponent },
]

function factory(routeName = 'Home') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
  router.push({ name: routeName })
  return mount(App, {
    global: {
      plugins: [router],
    },
  })
}

describe('App.vue', () => {
  it('renders MainHeader and Toast', async () => {
    const wrapper = factory()
    await flushPromises()
    expect(wrapper.find('.main-header-mock').exists()).toBe(true)
    expect(wrapper.find('.toast-mock').exists()).toBe(true)
  })

  it('renders Home route by default', async () => {
    const wrapper = factory('Home')
    await flushPromises()
    expect(wrapper.html()).toContain('Dummy')
  })

  it('renders RecipeDetail route', async () => {
    const wrapper = factory('RecipeDetail')
    await flushPromises()
    expect(wrapper.html()).toContain('RecipeDetail')
  })

  it('applies slide-right animation when navigating to RecipeDetail', async () => {
    const wrapper = factory('Home')
    await flushPromises()
    await wrapper.vm.$router.push({ name: 'RecipeDetail' })
    await flushPromises()
    expect(wrapper.vm.animation).toBe('slide-right')
  })

  it('applies slide-left animation when navigating away from RecipeDetail', async () => {
    const wrapper = factory('RecipeDetail')
    await flushPromises()
    await wrapper.vm.$router.push({ name: 'Home' })
    await flushPromises()
    expect(wrapper.vm.animation).toBe('slide-left')
  })
})
