import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router/index'
import RecipesDatatable from '../RecipesDatatable.vue'
import { setActivePinia, createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { useRecipesStore } from '@/stores/recipesStore'
import type { Router } from 'vue-router'

vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}))

describe('RecipesDatatable.vue', () => {

  let wrapper: ReturnType<typeof mount> | null = null

  beforeEach(() => {
      setActivePinia(createPinia())
      const pinia = createPinia()
      setActivePinia(pinia)
      const recipesStore = useRecipesStore()
      recipesStore.recipes = [
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
            { ingredient: 'Baking Powder', measure: '½ tsp' },
            { ingredient: 'Eggs', measure: '3 Medium' },
            { ingredient: 'Vanilla Extract', measure: '½ tsp' },
            { ingredient: 'Almond Extract', measure: '¼ teaspoon' },
            { ingredient: 'Butter', measure: '175g' },
            { ingredient: 'Caster Sugar', measure: '175g' },
            { ingredient: 'Self-raising Flour', measure: '140g' },
            { ingredient: 'Almonds', measure: '50g' },
            { ingredient: 'Baking Powder', measure: '½ tsp' },
            { ingredient: 'Eggs', measure: '3 Medium' },
            { ingredient: 'Vanilla Extract', measure: '½ tsp' },
            { ingredient: 'Almond Extract', measure: '¼ teaspoon' },
            { ingredient: 'Pink Food Colouring', measure: '½ tsp' },
            { ingredient: 'Apricot', measure: '200g' },
            { ingredient: 'Marzipan', measure: '1kg' },
            { ingredient: 'Icing Sugar', measure: 'Dusting' }
          ]
        },
        {
          id: 52976,
          name: 'Cashew Ghoriba Biscuits',
          image: 'https://www.themealdb.com/images/media/meals/t3r3ka1560461972.jpg',
          favorite: true,
          instructions: 'Preheat the oven at 180 C baking tray with greaseproof paper.\r\nIn a bowl, mix the cashews and icing sugar. Add the egg yolks and orange blossom water and mix to a smooth homogeneous paste.\r\nTake lumps of the cashew paste and shape into small balls. Roll the balls in icing sugar and transfer to the baking tray. Push an almond in the centre of each ghribia.\r\nBake until the biscuits are lightly golden, about 20 minutes. Keep an eye on them, they burn quickly.',
          category: 'Dessert',
          area: 'Tunisian',
          tags: [],
          youtube: 'https://www.youtube.com/watch?v=IqXEZUk4hWI',
          source: 'http://allrecipes.co.uk/recipe/40152/cashew-ghoriba-biscuits.aspx',
          ingredients: [
            { ingredient: 'Cashew Nuts', measure: '250g' },
            { ingredient: 'Icing Sugar', measure: '100g' },
            { ingredient: 'Egg Yolks', measure: '2' },
            { ingredient: 'Orange Blossom Water', measure: '2 tbs' },
            { ingredient: 'Icing Sugar', measure: 'To Glaze' },
            { ingredient: 'Almonds', measure: '100g' }
          ]
        },
        {
          id: 52988,
          name: 'Classic Christmas pudding',
          image: 'https://www.themealdb.com/images/media/meals/1d85821576790598.jpg',
          favorite: false,
          instructions: 'Get everything for the pudding prepared. Chop the almonds coarsely. Peel, core and chop the cooking apples. Sharpen your knife and chop the candied peel. (You can chop the almonds and apples in a food processor, but the peel must be done by hand.) Grate three quarters of the nutmeg (sounds a lot but it\'s correct).\r\n\r\nMix the almonds, apples, candied peel, nutmeg, raisins, flour, breadcrumbs, light muscovado sugar, eggs and 2 tbsp brandy or cognac in a large bowl.\r\n\r\nHolding the butter in its wrapper, grate a quarter of it into the bowl, then stir everything together. Repeat until all the butter is grated, then stir for 3-4 mins – the mixture is ready when it subsides slightly after each stir. Ask the family to stir too, and get everyone to make a wish.\r\n\r\nGenerously butter two 1.2 litre bowls and put a circle of baking parchment in the bottom of each. Pack in the pudding mixture. Cover with a double layer of baking parchment, pleating it to allow for expansion, then tie with string (keep the paper in place with a rubber band while tying). Trim off any excess paper.\r\n\r\nNow stand each bowl on a large sheet of foil and bring the edges up over the top, then put another sheet of foil over the top and bring it down underneath to make a double package (this makes the puddings watertight). Tie with more string, and make a handle for easy lifting in and out of the pan. Watch our video to see how to tie up a pudding correctly.\r\n\r\nBoil or oven steam the puddings for 8 hrs, topping up with water as necessary. Remove from the pans and leave to cool overnight. When cold, discard the messy wrappings and re-wrap in new baking parchment, foil and string. Store in a cool, dry place until Christmas.\r\n\r\nTo make the brandy butter, cream the butter with the orange zest and icing sugar. Gradually beat in the brandy or cognac and chopped stem ginger. Put in a small bowl, fork the top attractively and put in the fridge to set. The butter will keep for a week in the fridge, or it can be frozen for up to six weeks.\r\n\r\nOn Christmas Day, boil or oven steam for 1 hr. Unwrap and turn out. To flame, warm 3-4 tbsp brandy in a small pan, pour it over the pudding and set light to it.',
          category: 'Dessert',
          area: 'British',
          tags: ['Christmas'],
          youtube: 'https://www.youtube.com/watch?v=Pb_lJxL1vtk',
          source: 'https://www.bbcgoodfood.com/recipes/classic-christmas-pudding',
          ingredients: [
            { ingredient: 'Almonds', measure: '50g' },
            { ingredient: 'Bramley Apples', measure: '2 large' },
            { ingredient: 'Candied Peel', measure: '200g' },
            { ingredient: 'Nutmeg', measure: '1 whole' },
            { ingredient: 'Raisins', measure: '1kg' },
            { ingredient: 'Plain Flour', measure: '140g' },
            { ingredient: 'Breadcrumbs', measure: '100g' },
            { ingredient: 'Muscovado Sugar', measure: '100g' },
            { ingredient: 'Eggs', measure: '3 Large' },
            { ingredient: 'Brandy', measure: '2 tbs' },
            { ingredient: 'Butter', measure: '250g' }
          ]
        }
      ]

      wrapper = mount(RecipesDatatable, {
        global: {
          plugins: [pinia, router, PrimeVue]
        }
      })
  })
  it('renders the component', () => {
    expect(wrapper?.exists()).toBe(true)
  })

  it('renders the correct number of recipes', () => {
    const recipeRows = wrapper?.findAll('tbody > tr')
    expect(recipeRows?.length ?? 0).toBe(3)
  })

  it('count favorites', () => {
    const favorites = wrapper?.findAll('button.p-button-contrast:not(.p-button-outlined) > .pi-star')
    expect(favorites?.length ?? 0).toBe(1)
    const noFavorites = wrapper?.findAll('button.p-button-contrast.p-button-outlined > .pi-star')
    expect(noFavorites?.length ?? 0).toBe(2)
  })

  it('toggles favorite state', async () => {
    const favoriteButton = wrapper?.findAll('button.p-button-contrast')[0]
    expect(favoriteButton?.classes()).toContain('p-button-outlined')

    await favoriteButton?.trigger('click')
    await wrapper?.vm.$nextTick()
    expect(favoriteButton?.classes()).not.toContain('p-button-outlined')

    await favoriteButton?.trigger('click')
    await wrapper?.vm.$nextTick()
    expect(favoriteButton?.classes()).toContain('p-button-outlined')
  })

  it('adds and removes favorites in localStorage', async () => {
    localStorage.removeItem('favorites')

    const favoriteButton = wrapper?.findAll('button.p-button-contrast')[0]
    expect(favoriteButton?.classes()).toContain('p-button-outlined')

    await favoriteButton?.trigger('click')
    await wrapper?.vm.$nextTick()
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    expect(favorites).toContain(52894)

    await favoriteButton?.trigger('click')
    await wrapper?.vm.$nextTick()
    favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    expect(favorites).not.toContain(52894)
  })

  it('navigates to recipe details on row click', async () => {
    const pushSpy = vi.spyOn((wrapper?.vm.$router as Router), 'push')
    const recipeRow = wrapper?.find('tbody > tr')
    await recipeRow?.trigger('click')
    expect(pushSpy).toHaveBeenCalledWith({
      name: 'RecipeDetail',
      params: { id: 52894 },
    })
  })


})
