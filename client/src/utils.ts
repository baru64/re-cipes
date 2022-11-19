import type {Ingredient} from "./data";
import {UNITS} from "./data";

export const getIngredients = (): Ingredient[] => [
    {
        name: 'tomato',
        measure: UNITS.PIECE,
    },
    {
        name: 'apple',
        measure: UNITS.PIECE,
    },
    {
        name: 'noodles',
        measure: UNITS.G,
    },
];
