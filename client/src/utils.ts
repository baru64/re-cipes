import type {Ingredient, Recipe, SearchPayload} from "./data";

const API_URL = 'http://127.0.0.1:8000';

export const callAPI = async (url: String, method?: string, body?: string) => {
    const response = await fetch(
        `${API_URL}${url}`,
        (method && body) ? {
            method,
            body,
        } : {},
    );
    const data = await response.json();

    if (response.ok) {
        return data;
    }
}

export const searchRecipes = async (items: SearchPayload[]) => {
    const result = await (callAPI(
            '/recipe/_search',
            "POST",
            JSON.stringify(items))
    );
    return result;
}

export const getAllIngredients = async (): Promise<Ingredient[]> => {
    const result = await callAPI('/ingredients');
    return result;
}

export async function fetchRecipes(): Promise<Recipe[]> {
    const result = await callAPI('/recipes');
    return result;
}

export const fetchSingleRecipe = async (id: Number) => {
    const result = await callAPI(`/recipes/${id}`);
    return result
}

export const fetchSingleIngredient = async (id: Number) => {
    const result = await callAPI(`/ingredients/${id}`);
    return result;
}
