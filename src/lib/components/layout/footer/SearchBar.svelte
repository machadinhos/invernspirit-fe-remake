<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import { Icon } from "svelte-icons-pack";
  import { BsArrowRight } from "svelte-icons-pack/bs";
  import { SlMagnifier } from "svelte-icons-pack/sl";

  let searchString = $state("");

  function doSearch() {
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
      bind:value={searchString}
      class="w-full bg-background text-white focus:border-none focus:outline-none"
      placeholder="Search..."
      onkeydown={handleKeyDown}
    />
  </div>
  <Button onclick={doSearch} className="w-20 flex justify-center">
    <Icon color="white" src={BsArrowRight} size="20" />
  </Button>
</div>
