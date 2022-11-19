<script lang="ts">

</script>


<div class="solo-demo-container solo-container">
    <Paper class="solo-paper" elevation={6}>
        <Icon class="material-icons">search</Icon>
        <Input
                bind:value
                on:keydown={handleKeyDown}
                placeholder="Search recipe"
                class="solo-input"
        />
    </Paper>
</div>

<script lang="ts">
    import {Input} from "@smui/textfield"
    import Paper from '@smui/paper'
 </script>