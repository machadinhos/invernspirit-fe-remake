<script lang="ts">
  import { DropdownMenu, DropdownMenuItem, ShrinkOnClickWrapper } from '$components';
  import { common } from '$content';
  import { FaSolidChevronDown } from 'svelte-icons-pack/fa';
  import { Icon } from 'svelte-icons-pack';
  import NavbarItem from './NavbarItem.svelte';

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLElement | undefined = $state();

  function toggleDropdown() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<nav class="mt-5">
  <ul class="flex h-full items-center gap-32 text-xl">
    <NavbarItem>
      <button
        bind:this={dropdownTriggerElement}
        class="flex items-center gap-1.5"
        onclick={toggleDropdown}
        type="button"
      >
        {common.header.middleSection.shop.title}
        <div class="transition-transform duration-300" class:rotate-180={isOpen}>
          <Icon size={10} src={FaSolidChevronDown} />
        </div>
      </button>
      <DropdownMenu isFullWidth triggerElement={dropdownTriggerElement} bind:isOpen>
        <div class="flex flex-col items-center justify-center gap-4 py-4 text-2xl">
          <DropdownMenuItem>
            <a class="hover:text-primary" href="/shop/collections" onclick={() => (isOpen = false)}
              >{common.header.middleSection.shop.byCollection}</a
            >
          </DropdownMenuItem>
          <div class="h-0.5 w-10 bg-white"></div>
          <DropdownMenuItem>
            <a class="hover:text-primary" href="/shop/products" onclick={() => (isOpen = false)}
              >{common.header.middleSection.shop.byProduct}</a
            >
          </DropdownMenuItem>
        </div>
      </DropdownMenu>
    </NavbarItem>
    <NavbarItem>
      <a href="/about">{common.header.middleSection.about}</a>
    </NavbarItem>
    <li>
      <ShrinkOnClickWrapper>
        <div class="flex h-16 w-16 items-center justify-center">
          <a class="imageLink flex h-full w-full items-center justify-center" href="/">
            <img class="logoImage h-10 w-10 object-contain" alt="logo" fetchpriority="high" src="/images/logo.webp" />
          </a>
        </div>
      </ShrinkOnClickWrapper>
    </li>
    <NavbarItem>
      <a href="/contact-us">{common.header.middleSection.contactUs}</a>
    </NavbarItem>
    <NavbarItem>
      <a class="h-full" href="/faq">{common.header.middleSection.faq}</a>
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
