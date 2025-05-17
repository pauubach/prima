import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import RecipeListView from '../views/RecipesView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/recipes',
    name: 'RecipeList',
    component: RecipeListView,
    children: [
      {
        path: 'search/:search',
        name: 'RecipeListBySearch',
        component: RecipeListView,
      },
      {
        path: 'ingredient/:ingredient',
        name: 'RecipeListByIngredient',
        component: RecipeListView,
      },
      {
        path: 'favorites',
        name: 'RecipeListFavorites',
        component: RecipeListView,
      },
    ],
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetailView,
    props: true,
  },
  {
    path: '/',
    redirect: '/recipes',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'RecipeList' && Object.keys(to.query).length === 0) {
    const lastSearch = localStorage.getItem('lastSearch')
    if (lastSearch) {
      next({ name: 'RecipeList', query: { q: lastSearch } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
