class RecipeService {
  public async fetchAll() {
    return this.fetchRecipes('search.php?s=');
  }

  public async filterByIngredient(ingredient: string) {
    return this.fetchRecipes(`filter.php?i=${ingredient}`);
  }

  public async filterByCountry(country: string) {
    return this.fetchRecipes(`filter.php?a=${country}`);
  }

  public async filterByCategory(category: string) {
    return this.fetchRecipes(`filter.php?c=${category}`);
  }

  public async fetchInfo(id: string) {
    return this.fetchRecipes(`lookup.php?i=${id}`);
  }

  private async fetchRecipes(endpoint: string) {
    const res = await fetch(`${process.env.API_URL}/${endpoint}`);
    if (!res.ok) throw new Error(`MealDB API error: ${res.statusText}`);
    return res.json();
  }
}

export default new RecipeService();
