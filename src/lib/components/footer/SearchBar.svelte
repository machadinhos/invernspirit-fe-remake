<script lang="ts">
  import { Input } from '@smui/textfield';
  import Paper from '@smui/paper';
  import { Icon } from '@smui/common';

  let value = '';

  function doSearch() {
    alert('Search for ' + value);
  }

  function handleKeyDown(event: CustomEvent | KeyboardEvent) {
    event = event as KeyboardEvent;
    if (event.key === 'Enter') {
      doSearch();
    }
  }
</script>

<div class="solo-demo-container solo-container">
  <Paper class="solo-paper" elevation={6}>
    <Icon class="material-icons">search</Icon>
    <Input bind:value on:keydown={handleKeyDown} placeholder="Search" class="solo-input" />
  </Paper>
  <button on:click={doSearch} disabled={value === ''} color="primary" class="solo-fab">
    <Icon class="material-icons">arrow_forward</Icon>
  </button>
</div>

<style>
  .solo-demo-container {
    padding: 0px;
    background-color: var(--mdc-theme-background, #4c4b48);
    border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    opacity: 0.7;
  }

  .solo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  * :global(.solo-paper) {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 600px;
    margin: 0 0px;
    padding: 0 0px;
    height: auto;
  }
  * :global(.solo-paper > *) {
    display: inline-block;
    margin: 0 12px;
  }
  * :global(.solo-input) {
    flex-grow: 1;
    color: var(--mdc-theme-on-surface, #000);
  }
  * :global(.solo-input::placeholder) {
    color: var(--mdc-theme-on-surface, #000);
    opacity: 0.6;
  }
  * :global(.solo-fab) {
    flex-shrink: 0;
  }
</style>
