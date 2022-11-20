<script lang="ts">
    import {fetchSingleIngredient, fetchSingleRecipe} from "./utils";
    import Paper from "@smui/paper";
    import List, {Item, Text} from "@smui/list";

    export let id;
    let recipe;
    let ingredientsToDisplay = [];
    let descriptionLines = [];

    const getRecipeData = async () => {
        recipe = await fetchSingleRecipe(id);
        console.log(recipe);
        ingredientsToDisplay = await Promise.all(recipe.ingredients.map(async ({id, amount}) => {
            const ingredient = await fetchSingleIngredient(id);
            return {
                ...ingredient,
                amount,
            }
        }))
        descriptionLines = recipe.description.split('\n');
    }

    $: getRecipeData();
</script>

<Paper>
    <h1>{recipe?.name}</h1>
    <img src="https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2070663670559408809/3b48612971a491646c91afdaef1a0e1f_large.png&width=256&type=webp&quality=80"
         alt="">
    {#if ingredientsToDisplay.length}
        <h2>Ingredients: </h2>
        <List>
            {#each ingredientsToDisplay as ingredient}
                <Item>
                    <Text>{ingredient.name}, {ingredient.amount} {ingredient.amount_unit}</Text>
                </Item>
            {/each}
        </List>
    {/if}
    <h2>Preparation steps: </h2>
    {#each descriptionLines as line}
        <p>{line}</p>
    {/each}
</Paper>
