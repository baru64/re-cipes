// export interface Ingredient {
//     name: String;
//     text: String;
//     quantity: Number;
//     measure: Units;
//     food: String;
//     foodId?: String;
//     image?: String;
// }
export interface Ingredient {
    name: String;
    text?: String;
    measure: UNITS;
    image?: String;
}

// export interface Product {
//     food: String;
//     name: String;
//     quantity: Number;
//     measure: Units;
//     image: String;
// }
export interface Product extends Ingredient {
    quantity: Number;
}

export interface Recipe {
    name: String;
    description: String;
    ingredients: Ingredient[];
    picture: String;
    ecoScore?: Number;
}

export enum UNITS {
    G = 'g',
    ML = 'ml',
    PIECE = 'pieces',
}
