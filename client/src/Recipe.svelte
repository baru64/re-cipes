<script lang="ts">
    import {fetchSingleRecipe} from "./utils";
    import Paper from "@smui/paper";

    export let id;
    let recipe;

    const getRecipeData = async () => {
        recipe = await fetchSingleRecipe(id);
        console.log(recipe);
    }

    $: getRecipeData();
</script>

<Paper>
    <h1>{recipe?.name}</h1>
    <img src="https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2070663670559408809/3b48612971a491646c91afdaef1a0e1f_large.png&width=256&type=webp&quality=80" alt="">
    <h3>

    </h3>
</Paper>
