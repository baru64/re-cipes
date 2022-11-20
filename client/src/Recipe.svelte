<script lang="ts">
    import {fetchSingleIngredient, fetchSingleRecipe} from "./utils";
    import Paper from "@smui/paper";
    import List, {Item, Text} from "@smui/list";
    import {Link} from "svelte-navigator";

    export let id;
    let recipe;
    // let ingredientsToDisplay = [];
    let descriptionLines = [];

    const getRecipeData = async () => {
        recipe = await fetchSingleRecipe(id);
        console.log(recipe);
        // ingredientsToDisplay = await Promise.all(recipe.ingredients.map(async ({id, amount}) => {
        //     const ingredient = await fetchSingleIngredient(id);
        //     return {
        //         ...ingredient,
        //         amount,
        //     }
        // }))
        descriptionLines = recipe.description.split('\n');
    }

    $: getRecipeData();
</script>

<Link to="/">
    <p style="margin-left: 0; margin-right: auto;">Return home</p>
</Link>
<Paper>
    <h1>{recipe?.name}</h1>
    <img src="{recipe?.picture}" alt="">
    <!--{#if ingredientsToDisplay.length}-->
        <h2>Ingredients: </h2>
        <List>
            {#each descriptionLines as line}
                <Item>{line}</Item>
            {/each}
            <!--{#each ingredientsToDisplay as ingredient}-->
            <!--    <Item>-->
            <!--        <Text>{ingredient.name}, {ingredient.amount} {ingredient.amount_unit}</Text>-->
            <!--    </Item>-->
            <!--{/each}-->
        </List>
    <!--{/if}-->
</Paper>
