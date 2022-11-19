<script lang="ts">
    import Textfield from '@smui/textfield'
    import Autocomplete from '@smui-extra/autocomplete'
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import Button from '@smui/button';
    import List, {Item, Meta, Text, Graphic} from '@smui/list';

    import {getAllIngredients} from "../utils";
    import type {Ingredient} from "../data";

    let selectedIngredient: Ingredient = null;
    let selectedAmount: Number = null;
    let items: Ingredient[] = [];

    const allIngredients = getAllIngredients();

    const handleAddItem = () => {
        if (!!items.find((item) => item.name === selectedIngredient.name)) {
            items = items.map(item => item.name === selectedIngredient.name ? {
                ...item,
                amount: item.amount + selectedAmount,
            } : item)
        } else {
            items = [...items, {...selectedIngredient, amount: selectedAmount}]
        }

        selectedIngredient = null;
        selectedAmount = null;
    }

    const handleRemoveItem = (item: Ingredient) => {
        items = items.filter(el => el.name !== item.name)
    }
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
                   suffix={selectedIngredient?.unit}/>
    </Cell>
    <Cell span={1}>
        <Button on:click={() => handleAddItem()}
                disabled={!selectedIngredient || (!selectedAmount && selectedAmount === 0)}
        >
            Add
        </Button>
    </Cell>
</LayoutGrid>
{#if items.length}
    <List avatarList>
        {#each items as item}
            <Item>
                <Graphic
                        style="background-image: url({item.image})"
                />
                <Text>{item.name}, {item.amount} {item.unit}</Text>
                <Meta class="material-icons" on:click={() => handleRemoveItem(item)}>delete</Meta>
            </Item>
        {/each}
    </List>
{/if}
