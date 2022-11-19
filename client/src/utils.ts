import type {Ingredient} from "./data";
import {UNITS} from "./data";

export const getAllIngredients = (): Ingredient[] => [
    {
        id: 1,
        name: 'tomato',
        unit: UNITS.PIECE,
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
