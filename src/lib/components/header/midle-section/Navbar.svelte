<script lang="ts">
  import DropdownMenu from '$lib/components/generic/dropdown/DropdownMenu.svelte';
  import NavbarItem from '$lib/components/header/midle-section/NavbarItem.svelte';
  import DropdownMenuItem from '$lib/components/generic/dropdown/DropdownMenuItem.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { FaSolidChevronDown } from 'svelte-icons-pack/fa';

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
      <button
        class="flex items-center gap-1.5"
        on:click={toggleDropdown}
        bind:this={dropdownTriggerElement}
      >
        shop
        <div class="transition-transform duration-300" class:rotate-180={isOpen}>
          <Icon src={FaSolidChevronDown} size={10} />
        </div>
      </button>
    </NavbarItem>
    <li>
      <a href="/">about</a>
    </li>
    <li>IMAGEM</li>
  </ul>
</nav>

<DropdownMenu {isOpen} triggerElement={dropdownTriggerElement} isFullWidth>
  <div class="flex flex-col items-center justify-center gap-4 py-4 text-white">
    <DropdownMenuItem>
      <a class="w-full" href="/">by collection</a>
    </DropdownMenuItem>
    <div class="h-0.5 w-10 bg-white" />
    <DropdownMenuItem>
      <a href="/">by product</a>
    </DropdownMenuItem>
  </div>
</DropdownMenu>
