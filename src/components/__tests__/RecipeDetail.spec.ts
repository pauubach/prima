import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router/index'
import { setActivePinia, createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { useRecipesStore } from '@/stores/recipesStore'
import RecipeDetail from '../RecipeDetail.vue'

vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}))

describe('RecipeDetail.vue', () => {

  let wrapper: ReturnType<typeof mount> | null = null

  beforeEach(() => {
    setActivePinia(createPinia())
    const pinia = createPinia()
    setActivePinia(pinia)
    const recipesStore = useRecipesStore()
    recipesStore.selectedRecipe =
    {
      id: 52894,
      name: 'Battenberg Cake',
      image: 'https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg',
      favorite: false,
      instructions: 'Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base). To make the almond sponge, put the butter, sugar, flour, ground almonds, baking powder, eggs, vanilla and almond extract in a large bowl. Beat with an electric whisk until the mix comes together smoothly. Scrape into the tin, spreading to the corners, and bake for 25-30 mins – when you poke in a skewer, it should come out clean. Cool in the tin for 10 mins, then transfer to a wire rack to finish cooling while you make the second sponge.\r\nFor the pink sponge, line the tin as above. Mix all the ingredients together as above, but don’t add the almond extract. Fold in some pink food colouring. Then scrape it all into the tin and bake as before. Cool.\r\nTo assemble, heat the jam in a small pan until runny, then sieve. Barely trim two opposite edges from the almond sponge, then well trim a third edge. Roughly measure the height of the sponge, then cutting from the well-trimmed edge, use a ruler to help you cut 4 slices each the same width as the sponge height. Discard or nibble leftover sponge. Repeat with pink cake.\r\nTake 2 x almond slices and 2 x pink slices and trim so they are all the same length. Roll out one marzipan block on a surface lightly dusted with icing sugar to just over 20cm wide, then keep rolling lengthways until the marzipan is roughly 0.5cm thick. Brush with apricot jam, then lay a pink and an almond slice side by side at one end of the marzipan, brushing jam in between to stick sponges, and leaving 4cm clear marzipan at the end. Brush more jam on top of the sponges, then sandwich remaining 2 slices on top, alternating colours to give a checkerboard effect. Trim the marzipan to the length of the cakes.\r\nCarefully lift up the marzipan and smooth over the cake with your hands, but leave a small marzipan fold along the bottom edge before you stick it to the first side. Trim opposite side to match size of fold, then crimp edges using fingers and thumb (or, more simply, press with prongs of fork). If you like, mark the 10 slices using the prongs of a fork.\r\nAssemble second Battenberg and keep in an airtight box or well wrapped in cling film for up to 3 days. Can be frozen for up to a month.',
      category: 'Dessert',
      area: 'British',
      tags: ['Cake', 'Sweet'],
      youtube: 'https://www.youtube.com/watch?v=aB41Q7kDZQ0',
      source: 'https://www.bbcgoodfood.com/recipes/1120657/battenberg-cake',
      ingredients: [
        { ingredient: 'Butter', measure: '175g' },
        { ingredient: 'Caster Sugar', measure: '175g' },
        { ingredient: 'Self-raising Flour', measure: '140g' },
        { ingredient: 'Almonds', measure: '50g' },
      ]
    }

    wrapper = mount(RecipeDetail, {
      global: {
        plugins: [pinia, router, PrimeVue],
        stubs: {
          teleport: true
        },
      }
    })
  })
  it('renders the component', () => {
    expect(wrapper?.exists()).toBe(true)
  })

  it('displays the recipe name', () => {
    const recipeName = wrapper?.find('h4')
    expect(recipeName?.text()).toContain('Battenberg Cake')
  })

  it('displays the recipe image', () => {
    const recipeImage = wrapper?.find('img')
    expect(recipeImage?.attributes('src')).toContain('https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg')
  })

  it('displays the recipe instructions', () => {
    const recipeInstructions = wrapper?.find('.instructions')
    expect(recipeInstructions?.text()).toContain('Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base).')
  })

  it('displays the recipe ingredients', () => {
    const recipeIngredients = wrapper?.findAll('.ingredient')
    expect(recipeIngredients?.length ?? 0).toBe(4)
    expect(recipeIngredients?.[0]?.text()).toContain('Butter(175g)')
    expect(recipeIngredients?.[1]?.text()).toContain('Caster Sugar(175g)')
  })

  it('displays the recipe category', () => {
    const recipeCategory = wrapper?.find('.category')
    expect(recipeCategory?.text()).toContain('Dessert')
  })

  it('displays the recipe area', () => {
    const recipeArea = wrapper?.find('.area')
    expect(recipeArea?.text()).toContain('British')
  })

  it('displays the recipe tags', () => {
    const recipeTags = wrapper?.findAll('.tag')
    expect(recipeTags?.length).toBe(2)
    expect(recipeTags?.[0].text()).toContain('Cake')
    expect(recipeTags?.[1].text()).toContain('Sweet')
  })

  it('displays the recipe source', () => {
    const recipeLink = wrapper?.find('.link')
    expect(recipeLink?.attributes('href')).toContain('https://www.bbcgoodfood.com/recipes/1120657/battenberg-cake')
    expect(recipeLink?.attributes('target')).toBe('_blank')
  })

  it('displays the recipe video', () => {
    const recipeVideo = wrapper?.find('.youtube')
    expect(recipeVideo?.attributes('src')).toContain('https://www.youtube.com/embed/aB41Q7kDZQ0')
  })
  it('Favorite button functionality', () => {
    const favoriteButton = wrapper?.find('button.p-button-outlined')
    expect(favoriteButton?.exists()).toBe(true)
    expect(useRecipesStore().selectedRecipe?.favorite).toBe(false)
    favoriteButton?.trigger('click')
    expect(useRecipesStore().selectedRecipe?.favorite).toBe(true)
    favoriteButton?.trigger('click')
    expect(useRecipesStore().selectedRecipe?.favorite).toBe(false)
  })
})
