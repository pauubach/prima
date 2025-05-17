import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

import {
  getMealsByName,
  getMealsByIngredient,
  getMealById,
  getMealIngredients,
} from '@/services/recipes'
import { getAllFavorites, addFavorite, removeFavorite } from '@/services/favorites'

import type { ServerIngredient, ServerMeal, Recipe, Ingredient } from '@/types/recipes'
import { debounce } from '@/services/utils'
import { useRouter } from 'vue-router'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([])
  const categories = ref([])
  const areas = ref([])
  const ingredients = ref<Ingredient[]>([])
  const selectedRecipe = ref<Recipe | null>(null)
  const selectedIngredient = ref<string>()
  const searchQuery = ref<string>('')
  const isLoadingRecipes = ref(false)
  const isLoadingIngredients = ref(false)
  const showingFavorites = ref(false)

  const toast = useToast()

  const getRecipesByName = async () => {
    isLoadingRecipes.value = true
    if (!searchQuery.value) return
    try {
      await getMealsByName(searchQuery.value).then((data) => {
        if (!data || data.length === 0) {
          toast.add({
            severity: 'error',
            summary: 'No Results',
            detail: `No recipes found for search "${searchQuery.value}".`,
            life: 3000,
          })
          recipes.value = []
          return
        }
        recipes.value = data.map((meal: ServerMeal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }))
        getDetails()
        router.push({ name: 'RecipeListBySearch', params: { search: searchQuery.value } })
      })
    } catch (error) {
      console.error('Error getting recipes:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error getting recipes. Check internet connection.',
        life: 3000,
      })
    } finally {
      isLoadingRecipes.value = false
    }
  }

  const getRecipesByIngredient = async (ingredient: string) => {
    isLoadingRecipes.value = true
    try {
      const favoriteIds = getAllFavorites()
      await getMealsByIngredient(ingredient).then((data) => {
        if (!data || data.length === 0) {
          toast.add({
            severity: 'error',
            summary: 'No Results',
            detail: `No recipes found with ${ingredient}.`,
            life: 3000,
          })
          recipes.value = []
          return
        }
        recipes.value = (data || []).map((meal: ServerMeal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          favorite: favoriteIds.includes(meal.idMeal),
        }))
        getDetails()
        router.push({ name: 'RecipeListByIngredient', params: { ingredient } })
      })
    } catch (error) {
      console.error('Error getting recipes by ingredient:', error)
      toast.add({
        severity: 'error',
        summary: 'No Results',
        detail: `No recipes found with ${ingredient}.`,
        life: 3000,
      })
    } finally {
      isLoadingRecipes.value = false
    }
  }

  const getIngredients = async () => {
    isLoadingIngredients.value = true
    try {
      await getMealIngredients().then((data) => {
        ingredients.value = (data || []).sort((a: ServerIngredient, b: ServerIngredient) =>
          a.strIngredient.localeCompare(b.strIngredient),
        )
      })
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "Can't fetch ingredients. Check internet connection.",
        life: 3000,
      })
    } finally {
      isLoadingIngredients.value = false
    }
  }

  const getRecipeById = async (id: number) => {
    try {
      const data = await getMealById(id)
      selectedRecipe.value = convertDetailsToRecipe(data) || null
    } catch (error) {
      console.error('Error fetching recipe details:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Can't fetch recipe details for recipe with id ${id}.`,
        life: 3000,
      })
    }
  }

  const getRecipe = async (id: number) => {
    const recipe = recipes.value.find((r) => r.id === id)
    if (recipe) {
      selectedRecipe.value = recipe
      return recipe
    } else {
      await getRecipeById(id)
      return selectedRecipe.value
    }
  }

  const getDetails = async () => {
    recipes.value.forEach(async (recipe) => {
      try {
        const details = await getMealById(recipe.id)
        if (details) {
          Object.assign(recipe, convertDetailsToRecipe(details))
        }
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Can't fetch details for recipe with id ${recipe.id}.`,
          life: 3000,
        })
      }
    })
  }

  getIngredients()

  const debouncedGetRecipesByName = debounce(getRecipesByName, 400)

  const router = useRouter()
  watch(searchQuery, (newQuery) => {
    if (newQuery && newQuery.length) {
      selectedIngredient.value = undefined
      showingFavorites.value = false
      debouncedGetRecipesByName()
    } else {
      recipes.value = []
    }
  })
  watch(selectedIngredient, (ingredient) => {
    if (ingredient) {
      searchQuery.value = ''
      showingFavorites.value = false
      getRecipesByIngredient(ingredient)
    }
  })
  watch(showingFavorites, (show) => {
    if (show) {
      searchQuery.value = ''
      selectedIngredient.value = undefined
      loadFavorites()
    } else {
      recipes.value = []
    }
  })

  // Favorites
  const toggleFavorite = (id: number) => {
    const recipe = recipes.value.find((r) => r.id === id)
    let statusFavorite = false
    if (recipe) {
      recipe.favorite = !recipe.favorite
      statusFavorite = recipe.favorite
    }
    if (selectedRecipe.value && selectedRecipe.value.id === id) {
      selectedRecipe.value.favorite = !selectedRecipe.value.favorite
      statusFavorite = selectedRecipe.value.favorite
    }
    if (recipe || (selectedRecipe.value && selectedRecipe.value.id === id)) {
      if (statusFavorite) {
        addFavorite(id)
      } else {
        removeFavorite(id)
        if (recipe && showingFavorites.value) {
          recipes.value = recipes.value.filter((r) => r.id !== id)
        }
      }
    }
  }

  const loadFavorites = () => {
    const favoriteIds = getAllFavorites()
    recipes.value = []
    if (favoriteIds.length === 0) {
      toast.add({
        severity: 'warn',
        summary: 'No Favorite Recipes',
        detail: 'Your favorites list is empty. Add some recipes to see them here.',
        life: 3000,
      })
      return
    }
    favoriteIds.forEach(async (id) => {
      try {
        const details = await getMealById(id)
        if (details) {
          recipes.value.push(convertDetailsToRecipe(details))
        }
      } catch (error) {
        console.error(`Error fetching favorite recipe with id ${id}:`, error)
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Can't fetch favorite recipe with id ${id}.`,
          life: 3000,
        })
      }
    })
    router.push({ name: 'RecipeListFavorites' })
  }

  const convertDetailsToRecipe = (details: ServerMeal): Recipe => {
    const favoriteIds = getAllFavorites()
    return {
      id: details.idMeal,
      name: details.strMeal,
      image: details.strMealThumb,
      favorite: favoriteIds.includes(details.idMeal),
      instructions: details.strInstructions,
      category: details.strCategory,
      area: details.strArea,
      tags: details.strTags ? details.strTags.split(',').map((tag: string) => tag.trim()) : [],
      youtube: details.strYoutube,
      source: details.strSource,
      ingredients: Array.from({ length: 20 }, (_, i) => {
        const ingredient = details[`strIngredient${i + 1}`]?.trim()
        const measure = details[`strMeasure${i + 1}`]?.trim()
        return ingredient ? { ingredient, measure } : null
      }).filter(Boolean) as Ingredient[],
    }
  }

  return {
    recipes,
    categories,
    areas,
    ingredients,
    selectedRecipe,
    selectedIngredient,
    searchQuery,
    isLoadingRecipes,
    isLoadingIngredients,
    showingFavorites,
    getRecipesByName,
    getRecipesByIngredient,
    getIngredients,
    getRecipeById,
    toggleFavorite,
    getRecipe,
  }
})
