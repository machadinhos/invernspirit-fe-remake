<script lang="ts">
  import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { FaSolidChevronDown } from 'svelte-icons-pack/fa';
  import NavbarItem from '$lib/components/layout/header/middle-section/NavbarItem.svelte';
  import { content } from '$lib/content/content';

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLElement | undefined = $state();

  function toggleDropdown() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<nav class="mt-5">
  <ul class="flex h-full items-center gap-20 text-white">
    <NavbarItem>
      <button
        class="flex items-center gap-1.5"
        onclick={toggleDropdown}
        bind:this={dropdownTriggerElement}
      >
        {content.common.header.middleSection.shop.title}
        <div
          class="transition-transform duration-300"
          class:rotate-180={isOpen}
        >
          <Icon src={FaSolidChevronDown} size={10} />
        </div>
      </button>
      <DropdownMenu
        bind:isOpen
        triggerElement={dropdownTriggerElement}
        isFullWidth
      >
        <div
          class="flex flex-col items-center justify-center gap-4 py-4 text-white"
        >
          <DropdownMenuItem>
            <a
              onclick={() => (isOpen = false)}
              class="hover:text-primary"
              href="/"
              >{content.common.header.middleSection.shop.byCollection}</a
            >
          </DropdownMenuItem>
          <div class="h-0.5 w-10 bg-white"></div>
          <DropdownMenuItem>
            <a
              onclick={() => (isOpen = false)}
              class="hover:text-primary"
              href="/">{content.common.header.middleSection.shop.byProduct}</a
            >
          </DropdownMenuItem>
        </div>
      </DropdownMenu>
    </NavbarItem>
    <NavbarItem>
      <a href="/">{content.common.header.middleSection.about}</a>
    </NavbarItem>
    <li>
      <div class="flex h-16 w-16 items-center justify-center">
        <a
          href="/"
          class="imageLink flex h-full w-full items-center justify-center"
        >
          <img
            fetchpriority="high"
            src="/images/logo.webp"
            alt="logo"
            class="logoImage h-10 w-10 object-contain"
          />
        </a>
      </div>
    </li>
    <NavbarItem>
      <a href="/">{content.common.header.middleSection.contactUs}</a>
    </NavbarItem>
    <NavbarItem>
      <a class="h-full" href="/faq">{content.common.header.middleSection.faq}</a
      >
    </NavbarItem>
  </ul>
</nav>

<style>
  .logoImage {
    transition: scale 300ms ease-in-out;
  }

  .imageLink:hover > .logoImage {
    scale: 130%;
  }
</style>
