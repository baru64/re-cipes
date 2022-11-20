import {writable} from "svelte/store";
import type {Recipe} from "./src/data";

export function createRecipesStore() {
    const {subscribe, update, set} = writable([])

    return {
        subscribe,
        filter: ()=>update(recipes => filterByIngredients(recipes)),
        init: async () => {
            const resp = await fetch("http://127.0.0.1:8000/recipes/");
            let data = await resp.json()
            if (resp.ok){
                console.log(data)
                return data
            }
            return
        }
    }
}

let filterByIngredients = (data:Recipe[]):Recipe[] => {
    return data.slice(1,20)

}

export const recipes_store = createRecipesStore()