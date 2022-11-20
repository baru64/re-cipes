export interface Ingredient {
    id: Number;
    name: String;
    description?: String;
    amount_unit: UNITS;
    picture?: String;
    picture_id: Number;
    amount?: Number;
}

export interface Recipe {
    id: Number;
    name: String;
    description: String;
    picture_id: Number;
    picture: String;
    eco_score: Number;
    ingredients: Ingredient[];
}

export enum UNITS {
    G = 'g',
    ML = 'ml',
    PIECE = 'pieces',
}

export interface SearchPayload {
    ingredient_id: Number;
    amount: Number;
}
