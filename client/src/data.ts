export interface Ingredient {
    id: Number;
    name: String;
    unit: UNITS;
    image?: String;
    amount?: Number;
}

export interface Product extends Ingredient {
    quantity: Number;
}

export interface Recipe {
    id: Number;
    name: String;
    image: String;
    ingredients: Ingredient[];
    steps: String[];
}

export enum UNITS {
    G = 'g',
    ML = 'ml',
    PIECE = 'pieces',
}
