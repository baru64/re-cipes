<script lang="ts">
    import Textfield from '@smui/textfield'
    import Autocomplete from '@smui-extra/autocomplete'
    import Paper from '@smui/paper';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import Button from '@smui/button';
    import List, {Item, Meta, Text} from '@smui/list';

    import {getIngredients} from "./utils";
    import type {Ingredient, Product} from "./data";

    let selectedIngredientName = '';
    let selectedIngredient: Ingredient = null;
    let selectedAmount: Number = null;
    let products: Product[] = [];

    const ingredients = getIngredients();

    $: selectedIngredient = ingredients.find(ingredient => ingredient.name === selectedIngredientName);

    const handleAddProduct = () => {
        const newProduct: Product = {
            ...selectedIngredient,
            quantity: selectedAmount,
        }
        if (!!products.find((product) => product.name === newProduct.name)) {
            products = products.map(product => product.name === newProduct.name ? {
                ...product,
                quantity: product.quantity + newProduct.quantity,
            } : product)
        } else {
            products = [...products, newProduct]
        }

        selectedIngredientName = '';
        selectedAmount = null;
    }

    const handleRemoveProduct = (product: Product) => {
        products = products.filter(el => el.name !== product.name)
    }
</script>

<Paper>
    <h3>Select ingredient and amount</h3>
    <LayoutGrid>
        <Cell span={6}>
            <Autocomplete
                    options={ingredients.map(({name}) => name)}
                    bind:value={selectedIngredientName}
                    label="Product"
            />
        </Cell>
        <Cell span={5}>
            <Textfield label="Amount" bind:value={selectedAmount} type="number" input$min="0"
                       suffix={selectedIngredient?.measure}/>
        </Cell>
        <Cell span={1}>
            <Button on:click={() => handleAddProduct()}
                    disabled={!selectedIngredient || (!selectedAmount && selectedAmount === 0)}
            >
                Add
            </Button>
        </Cell>
    </LayoutGrid>
</Paper>
{#if products.length}
    <Paper>
        <List avatarList>
            {#each products as product}
                <Item>
                    <Text>{product.name}, {product.quantity} {product.measure}</Text>
                    <Meta class="material-icons" on:click={() => handleRemoveProduct(product)}>delete</Meta>
                </Item>
            {/each}
        </List>
    </Paper>
{/if}
