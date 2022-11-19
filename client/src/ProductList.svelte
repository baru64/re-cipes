<script lang="ts">
    import Textfield from '@smui/textfield'
    import Autocomplete from '@smui-extra/autocomplete'
    import Paper from '@smui/paper';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import Button from '@smui/button';

    import {getIngredients} from "./utils";
    import type {Ingredient, Product} from "./data";

    let selectedIngredientName = '';
    let selectedIngredient: Ingredient = null;
    let selectedAmount: Number = null;
    let products: Product[] = [];

    const ingredients = getIngredients();

    $: selectedIngredient = ingredients.find(ingredient => ingredient.name === selectedIngredientName);

</script>

<Paper>
    <LayoutGrid>
        <Cell span={6}>
            <Autocomplete
                    options={ingredients.map(({name}) => name)}
                    bind:value={selectedIngredientName}
                    label="Product"
            />
        </Cell>
        <Cell span={2}>
            <Textfield label="Amount" bind:value={selectedAmount} type="number"/>
        </Cell>
        <Cell span={2}>
            {#if selectedIngredient}
                <p>{selectedIngredient.measure}</p>
            {/if}
        </Cell>
        <Cell span={2}>
            <Button on:click={products = [...products, {...selectedIngredient, amount: selectedAmount}]} disabled="">Add</Button>
        </Cell>
    </LayoutGrid>
</Paper>
