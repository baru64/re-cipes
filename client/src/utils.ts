import type {Ingredient, Recipe} from "./data";
import {UNITS} from "./data";

const API_URL = 'http://127.0.0.1:8000';

export const getAllIngredients = (): Ingredient[] => [
    {
        id: 1,
        name: 'tomato',
        unit: UNITS.PIECE,
        image: "https://www.edamam.com/food-img/23e/23e727a14f1035bdc2733bb0477efbd2.jpg",
    },
    {
        id: 2,
        name: 'apple',
        unit: UNITS.PIECE,
    },
    {
        id: 3,
        name: 'noodles',
        unit: UNITS.G,
    },
];

export async function fetchRecipes(): Promise<Recipe[]> {
    const resp = await fetch(`${API_URL}/recipes-pretty/`);
    const data = await resp.json();

    if (resp.ok) {
        return data
    }
}

export const fetchSingleRecipe = async (id: Number) => {
    const response = await fetch(`${API_URL}/recipes/${id}`)
    const data = await response.json();

    if (response.ok) {
        return data;
    }
}
