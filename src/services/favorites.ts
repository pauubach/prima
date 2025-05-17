const FAVORITE_KEY = 'favorites'

function getFavorites(): number[] {
  const data = localStorage.getItem(FAVORITE_KEY)
  return data ? (JSON.parse(data) as number[]) : []
}

function setFavorites(favorites: number[]): void {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites))
}

export function addFavorite(id: number): void {
  const favorites = getFavorites()
  if (!favorites.includes(id)) {
    favorites.push(id)
    setFavorites(favorites)
  }
}

export function removeFavorite(id: number): void {
  const favorites = getFavorites().filter((fav) => fav !== id)
  setFavorites(favorites)
}

export function getAllFavorites(): number[] {
  return getFavorites()
}
