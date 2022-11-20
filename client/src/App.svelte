<script lang="ts">
    import {Router, Route } from "svelte-navigator";
    import Paper from "@smui/paper";
    import ProductList from "./ProductList.svelte";
    import RecipeGrid from "./RecipeGrid.svelte";
    import Recipe from "./Recipe.svelte";
</script>

<Router>
    <main>
        <Route path="/">
            <Paper>
                <RecipeGrid/>
                <ProductList/>
            </Paper>
        </Route>

        <Route path="recipe/:id" let:params>
            <Recipe id={params.id}/>
        </Route>
    </main>
</Router>
