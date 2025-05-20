import { setActivePinia, createPinia } from 'pinia'
import { useRecipesStore } from '@/stores/recipesStore'
import { describe, beforeEach, it, expect, vi } from 'vitest'

// Mock dependencies
vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}))
vi.mock('@/services/recipes', () => ({
  getMealsByName: vi.fn(() => Promise.resolve([
    {
      "idMeal": "53071",
      "strMeal": "Beef Asado",
      "strMealAlternate": null,
      "strCategory": "Beef",
      "strArea": "Filipino",
      "strInstructions": "0.\tCombine beef, crushed peppercorn, soy sauce, vinegar, dried bay leaves, lemon, and tomato sauce. Mix well. Marinate beef for at least 30 minutes.\r\n1.\tPut the marinated beef in a cooking pot along with remaining marinade. Add water. Let boil.\r\n2.\tAdd Knorr Beef Cube. Stir. Cover the pot and cook for 40 minutes in low heat.\r\n3.\tTurn the beef over. Add tomato paste. Continue cooking until beef tenderizes. Set aside.\r\n4.\tHeat oil in a pan. Fry the potato until it browns. Turn over and continue frying the opposite side. Remove from the pan and place on a clean plate. Do the same with the carrots.\r\n5.\tSave 3 tablespoons of cooking oil from the pan where the potato was fried. Saute onion and garlic until onion softens.\r\n6.\tPour-in the sauce from the beef stew. Let boil. Add the beef. Cook for 2 minutes.\r\n7.\tAdd butter and let it melt. Continue cooking until the sauce reduces to half.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/pkopc31683207947.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=lNlK8DVhXXA",
      "strIngredient1": "Beef",
      "strIngredient2": "Beef Stock Concentrate",
      "strIngredient3": "Tomato Puree",
      "strIngredient4": "Water",
      "strIngredient5": "Soy Sauce",
      "strIngredient6": "White Wine Vinegar",
      "strIngredient7": "Pepper",
      "strIngredient8": "Bay Leaf",
      "strIngredient9": "Lemon",
      "strIngredient10": "Tomato Sauce",
      "strIngredient11": "Butter",
      "strIngredient12": "Olive Oil",
      "strIngredient13": "Onion",
      "strIngredient14": "Garlic",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1.5kg",
      "strMeasure2": "1",
      "strMeasure3": "8 ounces",
      "strMeasure4": "3 cups ",
      "strMeasure5": "6 tablespoons",
      "strMeasure6": "1 tbs",
      "strMeasure7": "2 tbs",
      "strMeasure8": "4",
      "strMeasure9": "1/2 ",
      "strMeasure10": "2 tbs",
      "strMeasure11": "3 tbs",
      "strMeasure12": "1/2 cup ",
      "strMeasure13": "1 chopped",
      "strMeasure14": "4 cloves",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://panlasangpinoy.com/beef-asado/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52952",
      "strMeal": "Beef Lo Mein",
      "strMealAlternate": null,
      "strCategory": "Beef",
      "strArea": "Chinese",
      "strInstructions": "STEP 1 - MARINATING THE BEEF\r\nIn a bowl, add the beef, salt, 1 pinch white pepper, 1 Teaspoon sesame seed oil, 1/2 egg, corn starch,1 Tablespoon of oil and mix together.\r\nSTEP 2 - BOILING THE THE NOODLES\r\nIn a 6 qt pot add your noodles to boiling water until the noodles are submerged and boil on high heat for 10 seconds. After your noodles is done boiling strain and cool with cold water.\r\nSTEP 3 - STIR FRY\r\nAdd 2 Tablespoons of oil, beef and cook on high heat untill beef is medium cooked.\r\nSet the cooked beef aside\r\nIn a wok add 2 Tablespoon of oil, onions, minced garlic, minced ginger, bean sprouts, mushrooms, peapods and 1.5 cups of water or until the vegetables are submerged in water.\r\nAdd the noodles to wok\r\nTo make the sauce, add oyster sauce, 1 pinch white pepper, 1 teaspoon sesame seed oil, sugar, and 1 Teaspoon of soy sauce.\r\nNext add the beef to wok and stir-fry",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529444830.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=ZT9LSsNXXe0",
      "strIngredient1": "Beef",
      "strIngredient2": "Salt",
      "strIngredient3": "Pepper",
      "strIngredient4": "Sesame Seed Oil",
      "strIngredient5": "Egg",
      "strIngredient6": "Starch",
      "strIngredient7": "Oil",
      "strIngredient8": "Noodles",
      "strIngredient9": "Onion",
      "strIngredient10": "Minced Garlic",
      "strIngredient11": "Ginger",
      "strIngredient12": "Bean Sprouts",
      "strIngredient13": "Mushrooms",
      "strIngredient14": "Water",
      "strIngredient15": "Oyster Sauce",
      "strIngredient16": "Sugar",
      "strIngredient17": "Soy Sauce",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1/2 lb",
      "strMeasure2": "pinch",
      "strMeasure3": "pinch",
      "strMeasure4": "2 tsp",
      "strMeasure5": "1/2 ",
      "strMeasure6": "3 tbs",
      "strMeasure7": "5 tbs",
      "strMeasure8": "1/4 lb",
      "strMeasure9": "1/2 cup ",
      "strMeasure10": "1 tsp ",
      "strMeasure11": "1 tsp ",
      "strMeasure12": "1 cup ",
      "strMeasure13": "1 cup ",
      "strMeasure14": "1 cup ",
      "strMeasure15": "1 tbs",
      "strMeasure16": "1 tsp ",
      "strMeasure17": "1 tsp ",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://sueandgambo.com/pages/beef-lo-mein",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53053",
      "strMeal": "Beef Rendang",
      "strMealAlternate": null,
      "strCategory": "Beef",
      "strArea": "Malaysian",
      "strInstructions": "Chop the spice paste ingredients and then blend it in a food processor until fine.\r\nHeat the oil in a stew pot, add the spice paste, cinnamon, cloves, star anise, and cardamom and stir-fry until aromatic. Add the beef and the pounded lemongrass and stir for 1 minute. Add the coconut milk, tamarind juice, water, and simmer on medium heat, stirring frequently until the meat is almost cooked. Add the kaffir lime leaves, kerisik (toasted coconut), sugar or palm sugar, stirring to blend well with the meat.\r\nLower the heat to low, cover the lid, and simmer for 1 to 1 1/2 hours or until the meat is really tender and the gravy has dried up. Add more salt and sugar to taste. Serve immediately with steamed rice and save some for overnight.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=Ot-dmfBaZrA",
      "strIngredient1": "Beef",
      "strIngredient2": "Vegetable Oil",
      "strIngredient3": "Cinnamon Stick",
      "strIngredient4": "Cloves",
      "strIngredient5": "Star Anise",
      "strIngredient6": "Cardamom",
      "strIngredient7": "Coconut Cream",
      "strIngredient8": "Water",
      "strIngredient9": "Tamarind Paste",
      "strIngredient10": "Lime",
      "strIngredient11": "Sugar",
      "strIngredient12": "Challots",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1lb",
      "strMeasure2": "5 tbs",
      "strMeasure3": "1",
      "strMeasure4": "3",
      "strMeasure5": "3",
      "strMeasure6": "3",
      "strMeasure7": "1 cup ",
      "strMeasure8": "1 cup ",
      "strMeasure9": "2 tbs",
      "strMeasure10": "6",
      "strMeasure11": "1 tbs",
      "strMeasure12": "5",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://rasamalaysia.com/beef-rendang-recipe-rendang-daging/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    }
  ])),
  getMealsByIngredient: vi.fn(() => Promise.resolve([
    {
      "strMeal": "Apple Frangipan Tart",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
      "idMeal": "1"
    },
    {
      "strMeal": "Bakewell tart",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
      "idMeal": "2"
    },
    {
      "strMeal": "Battenberg Cake",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg",
      "idMeal": "3"
    }
  ])),
  getMealById: vi.fn((id) => Promise.resolve({ idMeal: id, strMeal: `Meal ${id}`, strMealThumb: '', strInstructions: '', strCategory: '', strArea: '', strTags: '', strYoutube: '', strSource: '' })),
  getMealIngredients: vi.fn(() => Promise.resolve([{ strIngredient: 'Chicken' }, { strIngredient: 'Beef' }])),
}))
vi.mock('@/services/favorites', () => ({
  getAllFavorites: vi.fn(() => []),
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
}))
vi.mock('@/services/utils', () => ({
  debounce: (fn: (...args: unknown[]) => unknown) => fn,
}))
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Recipes Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default values', () => {
    const store = useRecipesStore()
    expect(Array.isArray(store.recipes)).toBe(true)
    expect(store.selectedRecipe).toBeDefined()
    expect(store.searchQuery).toBe('')
    expect(store.isLoadingRecipes).toBeFalsy()
    expect(store.showingFavorites).toBeFalsy()
    expect(Array.isArray(store.ingredients)).toBe(true)
  })

  it('fetches recipes by name', async () => {
    const store = useRecipesStore()
    expect(store.recipes.length).toBe(0)
    store.searchQuery = 'Meal'
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.recipes.length).toBe(3)
    expect(store.recipes[0].name).toBe('Beef Asado')
  })

  it('fetches recipes by ingredient', async () => {
    const store = useRecipesStore()
    expect(store.recipes.length).toBe(0)
    store.selectedIngredient = 'Almond Extract'
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.recipes.length).toBeGreaterThan(0)
    expect(store.recipes[0].name).toBe('Meal 1')
  })

  it('fetches ingredients', async () => {
    const store = useRecipesStore()
    expect(store.ingredients.length).toBe(0)
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.ingredients.length).toBeGreaterThan(0)
    expect(store.ingredients[0].strIngredient).toBe('Beef')
  })

  it('fetches recipe by id', async () => {
    const store = useRecipesStore()
    await store.getRecipeById(123)
    expect(store.selectedRecipe).toBeDefined()
    expect(store.selectedRecipe?.id).toBe(123)
    expect(store.selectedRecipe?.name).toBe('Meal 123')
  })

  it('toggles favorite', () => {
    const store = useRecipesStore()
    store.recipes = [{ id: 1, name: 'Test', image: '', favorite: false }]
    store.toggleFavorite(1)
    expect(store.recipes[0].favorite).toBe(true)
    store.toggleFavorite(1)
    expect(store.recipes[0].favorite).toBe(false)
  })

  it('search fields clearing', async () => {
    const store = useRecipesStore()
    expect(store.searchQuery).toBe('')
    expect(store.selectedIngredient).toBeUndefined()
    expect(store.showingFavorites).toBe(false)
    store.showingFavorites = true
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.searchQuery).toBe('')
    expect(store.selectedIngredient).toBeUndefined()
    expect(store.showingFavorites).toBe(true)
    store.searchQuery = 'Meal'
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.searchQuery).toBe('Meal')
    expect(store.selectedIngredient).toBeUndefined()
    expect(store.showingFavorites).toBe(false)
    store.selectedIngredient = 'Almond Extract'
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.searchQuery).toBe('')
    expect(store.selectedIngredient).toBe('Almond Extract')
    expect(store.showingFavorites).toBe(false)
    store.showingFavorites = true
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(store.searchQuery).toBe('')
    expect(store.selectedIngredient).toBeUndefined()
    expect(store.showingFavorites).toBe(true)
  })
})
