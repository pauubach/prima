import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Get meal details by ID
export async function getMealById(id: number) {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`)
  return response.data.meals ? response.data.meals[0] : null
}

// Get all meal ingredients
export async function getMealIngredients() {
  const response = await axios.get(`${BASE_URL}/list.php?i=list`)
  return response.data.meals
}

// Get meals by name
export async function getMealsByName(name: string) {
  const response = await axios.get(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`)
  return response.data.meals
}

// Get meals by ingredient
export async function getMealsByIngredient(ingredient: string) {
  const response = await axios.get(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
  return response.data.meals
}
