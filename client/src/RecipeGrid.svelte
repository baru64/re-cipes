<script lang="ts">
    import Card, {Media, PrimaryAction,} from '@smui/card';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {fetchRecipes} from "./utils";
    import {Input} from "@smui/textfield";
    import Paper from "@smui/paper";
    import {Icon} from '@smui/common';
    import {Link} from "svelte-navigator";
    import {recipeItems} from "../store";

    let value = '';
    let recipes = [];

    recipeItems.subscribe(recipeItems => {
        console.log(recipeItems)
        recipes = recipeItems;
    })

    const getRecipes = async () => {
        recipes = await fetchRecipes();
    }

    function doSearch() {
        console.log('Search for ' + value);
    }

    function handleKeyDown(event: KeyboardEvent) {
        doSearch()
    }

    $: getRecipes();
</script>


<div class="solo-demo-container solo-container">
    <Paper class="solo-paper" elevation={6}>
        <Input
                bind:value
                on:keydown={handleKeyDown}
                placeholder="Search recipe"
                class="solo-input"
        >
        </Input>
        <Icon
                style="cursor: pointer;"
                disabled={value===''}
                on:click={doSearch}
                class="material-icons
        ">search
        </Icon>
    </Paper>
</div>
<LayoutGrid>
    {#if recipes?.length}
        {#each recipes?.splice(0, 9) as recipe}
            <Cell span={4} style="margin:-0.25rem">
                <div class="card-container">
                    <Link to="recipe/{recipe.id}">
                        <Card>
                            <PrimaryAction on:click={()=>{}}>
                                <Media style="background-image: url({recipe.picture});"
                                       class="card-media-16x9"
                                       aspectRatio="16x9">
                                    <div style="place-items: center start">
                                        <div style="height: 3rem ;background: floralwhite;opacity: 0.8;">
                                            <h2 style="top:100%">
                                                {recipe.name}
                                            </h2>
                                        </div>
                                    </div>
                                </Media>
                            </PrimaryAction>
                        </Card>
                    </Link>
                </div>
            </Cell>
        {/each}
    {/if}
</LayoutGrid>

<style>

    .solo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 3rem;
    }

    * :global(.solo-paper) {
        display: flex;
        align-items: center;
        flex-grow: 1;
        margin: 0 12px;
        padding: 0 12px;
        height: 48px;
    }

    * :global(.solo-paper > *) {
        display: inline-block;
        margin: 0 12px;
    }

    * :global(.solo-input) {
        /*font-size: 32px;*/
    }

    * :global(.solo-input::placeholder) {
        opacity: 0.6;
    }
</style>
