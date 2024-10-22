<script lang="ts">
  import DropdownMenu from '$lib/components/generic/dropdown/DropdownMenu.svelte';
  import NavbarItem from '$lib/components/header/midle-section/NavbarItem.svelte';
  import DropdownMenuItem from '$lib/components/generic/dropdown/DropdownMenuItem.svelte';

  let isOpen = false;
  let dropdownTriggerElement: HTMLElement;

  function toggleDropdown() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<nav class="flex items-center justify-center">
  <ul class="flex gap-20 text-white">
    <NavbarItem>
      <button on:click={toggleDropdown} bind:this={dropdownTriggerElement}>Test</button>
    </NavbarItem>
    <li>
      <a href="/">about</a>
    </li>
    <li>IMAGEM</li>
  </ul>
</nav>

<DropdownMenu {isOpen} triggerElement={dropdownTriggerElement} isFullWidth>
  <DropdownMenuItem>
    <div class="flex w-full justify-center text-white">
      <p>AHAH</p>
    </div>
  </DropdownMenuItem>
</DropdownMenu>
