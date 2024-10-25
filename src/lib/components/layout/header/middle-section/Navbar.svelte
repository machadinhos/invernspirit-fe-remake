<script lang="ts">
  import DropdownMenu from "$lib/components/ui/dropdown/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/components/ui/dropdown/DropdownMenuItem.svelte";
  import { Icon } from "svelte-icons-pack";
  import { FaSolidChevronDown } from "svelte-icons-pack/fa";
  import NavbarItem from "$lib/components/layout/header/middle-section/NavbarItem.svelte";

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLElement | undefined = $state();

  function toggleDropdown() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<nav>
  <ul class="flex h-full gap-20 text-white">
    <NavbarItem>
      <button
        class="flex items-center gap-1.5"
        onclick={toggleDropdown}
        bind:this={dropdownTriggerElement}
      >
        shop
        <div
          class="transition-transform duration-300"
          class:rotate-180={isOpen}
        >
          <Icon src={FaSolidChevronDown} size={10} />
        </div>
      </button>
    </NavbarItem>
    <NavbarItem>
      <a href="/">about</a>
    </NavbarItem>
    <li>
      <div class="flex items-center justify-center">
        <a href="/">
          <img
            src="/images/logo.webp"
            alt="logo"
            class="h-10 w-10 object-contain"
          />
        </a>
      </div>
    </li>
    <NavbarItem>
      <a href="/">contacts</a>
    </NavbarItem>
    <NavbarItem>
      <a class="h-full" href="/">faq</a>
    </NavbarItem>
  </ul>
</nav>

<DropdownMenu bind:isOpen triggerElement={dropdownTriggerElement} isFullWidth>
  <div class="flex flex-col items-center justify-center gap-4 py-4 text-white">
    <DropdownMenuItem>
      <a class="w-full" href="/">by collection</a>
    </DropdownMenuItem>
    <div class="h-0.5 w-10 bg-white"></div>
    <DropdownMenuItem>
      <a href="/">by product</a>
    </DropdownMenuItem>
  </div>
</DropdownMenu>
