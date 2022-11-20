<script lang="ts">
    import Textfield from '@smui/textfield'
    import Autocomplete from '@smui-extra/autocomplete'
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import Button from '@smui/button';
    import List, {Graphic, Item, Meta, Text} from '@smui/list';
    import {items, recipeItems} from "../store";

    import {getAllIngredients, searchRecipes} from "./utils";
    import type {Ingredient} from "./data";

    let selectedIngredient: Ingredient = null;
    let selectedAmount: Number = null;
    let itemsLen: Number = null;
    let currentItems: Ingredient[]
    let result = null
    let allIngredients = [];

    items.subscribe(items => {
        itemsLen = items.length
        currentItems = items
        doPost()
    })

    const fetchIngredients = async () => {
        allIngredients = await getAllIngredients();
    }

    const handleAddItem = () => {
        items.update(items => {
            if (!!items.find((item) => item.id === selectedIngredient.id)) {
                items = items.map(item => item.id === selectedIngredient.id ? {
                    ...item,
                    amount: item.amount + selectedAmount,
                } : item)
            } else {
                items = [...items, {...selectedIngredient, amount: selectedAmount}]
            }
            return items
        })

        selectedIngredient = null;
        selectedAmount = null;
    }

    async function doPost() {
        if (!!currentItems.length) {
            const searchItems = currentItems.map(({id, amount}) => ({ingredient_id: id, amount}))
            try {
                const recipes = await searchRecipes(searchItems)
                recipeItems.set(recipes);
            } catch(error) {
                console.log(error);
            }
            console.log("POST",JSON.stringify(searchItems))
        }
    }

    const handleRemoveItem = (item: Ingredient) => {
        items.update(items => items.filter(el => el.name !== item.name))
    }

    $: fetchIngredients();
</script>

<h3>Select ingredient and amount</h3>
<LayoutGrid>
    <Cell span={6}>
        <Autocomplete
                options={allIngredients}
                getOptionLabel={ingredient => ingredient?.name ?? ''}
                bind:value={selectedIngredient}
                label="Product"
        />
    </Cell>
    <Cell span={5}>
        <Textfield label="Amount" bind:value={selectedAmount} type="number" input$min="0"
                   suffix={selectedIngredient?.amount_unit}/>
    </Cell>
    <Cell span={1}>
        <Button on:click={() => handleAddItem()}
                disabled={!selectedIngredient || (!selectedAmount && selectedAmount === 0)}
        >
            Add
        </Button>
    </Cell>
</LayoutGrid>
{#if itemsLen}
    <List avatarList>
        {#each $items as item}
            <Item>
                <Graphic
                        style="background-image: url({item.picture})"
                />
                <Text>{item.name}, {item.amount} {item.amount_unit}</Text>
                <Meta class="material-icons" on:click={() => handleRemoveItem(item)}>delete</Meta>
            </Item>
        {/each}
    </List>
{/if}
