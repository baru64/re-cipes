<script lang="ts">
    import type {Recipe} from "./data";
    import Card, {Media, PrimaryAction,} from '@smui/card';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {getRecipes} from "./utils";

    let recipes = getRecipes()
</script>

<LayoutGrid>
    {#each recipes as recipe}
        <Cell span={3} style="margin:-0.25rem">
            <div class="card-container">
                <Card>
                    <PrimaryAction on:click={()=>{}}>
                        <Media style="background-image: url({recipe.image});"
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
            </div>
        </Cell>
    {/each}
</LayoutGrid>
