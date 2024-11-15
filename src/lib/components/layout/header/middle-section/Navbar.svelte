<script lang="ts">
  import NavbarItem from '$components/layout/header/middle-section/NavbarItem.svelte';
  import DropdownMenu from '$components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuItem from '$components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import { content } from '$content';
  import { Icon } from 'svelte-icons-pack';
  import { FaSolidChevronDown } from 'svelte-icons-pack/fa';

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
      <button bind:this={dropdownTriggerElement} class="flex items-center gap-1.5" onclick={toggleDropdown}>
        {content.common.header.middleSection.shop.title}
        <div class="transition-transform duration-300" class:rotate-180={isOpen}>
          <Icon size={10} src={FaSolidChevronDown} />
        </div>
      </button>
      <DropdownMenu bind:isOpen isFullWidth triggerElement={dropdownTriggerElement}>
        <div class="flex flex-col items-center justify-center gap-4 py-4 text-white">
          <DropdownMenuItem>
            <a class="hover:text-primary" href="/shop/collections" onclick={() => (isOpen = false)}
              >{content.common.header.middleSection.shop.byCollection}</a
            >
          </DropdownMenuItem>
          <div class="h-0.5 w-10 bg-white"></div>
          <DropdownMenuItem>
            <a class="hover:text-primary" href="/shop/products" onclick={() => (isOpen = false)}
              >{content.common.header.middleSection.shop.byProduct}</a
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
        <a class="imageLink flex h-full w-full items-center justify-center" href="/">
          <img alt="logo" class="logoImage h-10 w-10 object-contain" fetchpriority="high" src="/images/logo.webp" />
        </a>
      </div>
    </li>
    <NavbarItem>
      <a href="/contact-us">{content.common.header.middleSection.contactUs}</a>
    </NavbarItem>
    <NavbarItem>
      <a class="h-full" href="/faq">{content.common.header.middleSection.faq}</a>
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
