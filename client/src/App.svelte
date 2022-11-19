<script lang="ts">
    import Paper from "@smui/paper";
    import ProductList from "./ProductList.svelte";
    import RecipeGrid from "./RecipeGrid.svelte";
    import SearchBar from "../SearchBar.svelte";
</script>

<main>
    <Paper>
        <SearchBar/>
        <RecipeGrid/>
        <ProductList/>
    </Paper>
</main>
