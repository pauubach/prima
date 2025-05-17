export interface ServerIngredient {
  idIngredient: number
  strIngredient: string
  strDescription?: string
  strType?: string
}

export interface ServerMeal {
  strMeal: string
  strMealThumb: string
  idMeal: number
  strMealAlternate?: string | null
  strInstructions: string
  strCategory?: string
  strArea?: string
  strTags?: string
  strYoutube?: string
  strSource?: string
  [key: `strIngredient${number}`]: string | undefined
  [key: `strMeasure${number}`]: string | undefined
}

export interface Ingredient {
  ingredient: string
  measure: string
}

export interface Recipe {
  id: number
  name: string
  image: string
  favorite: boolean
  instructions?: string
  category?: string
  area?: string
  tags?: string[]
  youtube?: string
  source?: string
  ingredients?: Ingredient[]
}
