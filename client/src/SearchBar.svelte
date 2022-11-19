<script lang="ts">
    import {Input} from "@smui/textfield"
    import Paper from '@smui/paper'
    import {Icon} from '@smui/common'

    let value = '';

    function doSearch() {
        console.log('Search for ' + value);
    }

    function handleKeyDown(event: KeyboardEvent) {
        doSearch()
    }
</script>

<div class="solo-demo-container solo-container">
    <Paper class="solo-paper" elevation={6}>

        <Input style="height:200rem"
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

<style>
    .solo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5rem;
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
