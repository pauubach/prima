import { describe, it, beforeEach, vi, expect } from 'vitest'
import router from '../index'

describe('router/index.ts', () => {
  let localStorageMock: Record<string, string | null>

  beforeEach(() => {
    localStorageMock = {}
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => localStorageMock[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { localStorageMock[key] = value }),
      removeItem: vi.fn((key: string) => { delete localStorageMock[key] }),
      clear: vi.fn(() => { localStorageMock = {} }),
    })
  })

  it('redirects "/" to "/recipes"', async () => {
    await router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.fullPath).toBe('/recipes')
  })

  it('navigates to RecipeDetail with id param', async () => {
    await router.push('/recipe/123')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('RecipeDetail')
    expect(router.currentRoute.value.params.id).toBe('123')
  })

  it('navigates to RecipeListBySearch child route', async () => {
    await router.push('/recipes/search/chicken')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('RecipeListBySearch')
    expect(router.currentRoute.value.params.search).toBe('chicken')
  })

  it('navigates to RecipeListByIngredient child route', async () => {
    await router.push('/recipes/ingredient/Almonds')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('RecipeListByIngredient')
    expect(router.currentRoute.value.params.ingredient).toBe('Almonds')
  })

  it('navigates to RecipeListFavorites child route', async () => {
    await router.push('/recipes/favorites')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('RecipeListFavorites')
  })
})
