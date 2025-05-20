# PrimaCook

## 1. Set Up and Run

1. Clone the repository:
    ```
    git clone https://github.com/pauubach/prima.git
    cd prima
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the application in development mode:
    ```
    npm run dev
    ```
4. Open your browser and navigate to `http://localhost:5173`.

## 2. Tools and Libraries Used

- VueJS 3.15.13
- Vue Router 4.5.0
- Pinia 3.0.1
- Axios 1.9.0
- PrimeVue 4.3.4
- PrimeIcons 7.0.0
- Tailwind CSS 4.1.6
- Vitest 3.1.1
- Typescript 5.8.0
- Node 22.15.0
- Npm 11.3.0

## 3. Assumptions & Decisions

- API has been used in its free tier, that means there's no multi-ingredient search.
- It is really limiting, as I can't search for keywords and ingredients at the same time, which is annoying but we'll have to live with it. Actually, I sent two options to implement: 
    1. Search by one and then filter by the other in the frontend.
    2. Make them mutually exclusive.
    As API results are limited (up to 24 recipes for search) I chose the second option.
- Although documentation asked for short description and preparation time, the API doesn't provide this information. I could have get it from the original recipe URLs, but it would require scraping the content of multiple sources. Doable, but I assume it's out of the scope of this assessment.
- I got an email stating that I could skip the description bit, but I already included the instructions instead with size and position change for small screens. I liked the result, so I left it as is.
- I'm used to work with Vuetify (or no component libraries at all) but I wanted to try PrimeVue, which seems to be more modern and better mantained. Besides, it provides datatable virtual loading and pagination, which would be better to show thowsands of recipes. Then I realized that the API returns a very limited number of recipes, but I liked the result I was getting.
- I don't like back button where it is. I have considered to include it in the header or in the recipe detail box. That's something I would discuss with the designer or the team in a real environment.
- I tried to use Corporative colors, but these didn't seem to fit a cooking website, so I went for the orange tone instead. That would be another topic to discuss with the designer.