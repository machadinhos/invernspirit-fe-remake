<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import { Icon } from "svelte-icons-pack";
  import { SlMagnifier } from "svelte-icons-pack/sl";
  import { containsXSSPatterns } from "$lib/utils/input-validation";

  let searchString = $state("");

  function doSearch() {
    if (containsXSSPatterns(searchString)) return;
    alert("todo");
  }

  function handleKeyDown(event: CustomEvent | KeyboardEvent) {
    event = event as KeyboardEvent;
    if (event.key === "Enter") {
      doSearch();
    }
  }
</script>

<div class="flex w-full">
  <div class="flex w-full items-center bg-background">
    <div class="px-2">
      <Icon src={SlMagnifier} size="20" color="white" />
    </div>
    <input
      type="search"
      bind:value={searchString}
      class="w-full bg-background text-white focus:border-none focus:outline-none"
      placeholder="Search product..."
      onkeydown={handleKeyDown}
    />
  </div>
  <Button onclick={doSearch} className="w-20 flex justify-center">
    Search
  </Button>
</div>
