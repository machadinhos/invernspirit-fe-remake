<script lang="ts">
  import { ChevronDownIcon, Icon } from '$components-svg-icons';
  import { DropdownMenu, DropdownMenuItem, ShrinkOnClickWrapper } from '$components';
  import { common } from '$content';
  import { page } from '$app/state';

  let isOpen = $state(false);

  const toggleDropdown = (): void => {
    isOpen = !isOpen;
  };

  const closeDropdown = (): void => {
    isOpen = false;
  };
</script>

{#snippet headerLogo()}
  <ShrinkOnClickWrapper>
    <div class="grid size-16 place-items-center">
      <a class="group grid place-items-center" href="/{page.params.country}/">
        <img
          class="size-12 object-contain transition-[scale] duration-300 group-hover:scale-130"
          alt="logo"
          fetchpriority="high"
          src="/images/logo.webp"
        />
      </a>
    </div>
  </ShrinkOnClickWrapper>
{/snippet}

<ul class="mt-5 hidden h-full items-center gap-28 text-xl xl:flex">
  <li>
    <DropdownMenu isFullWidth bind:isOpen>
      {#snippet triggerElement()}
        <button class="flex items-center gap-1.5" onclick={toggleDropdown} type="button">
          {common.header.pages.shop.title}
          <Icon class={['duration-300', isOpen && 'rotate-180']} src={ChevronDownIcon} />
        </button>
      {/snippet}
      <div class="grid place-items-center gap-4 py-4 text-2xl">
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/{page.params.country}/shop/collections" onclick={closeDropdown}
            >{common.header.pages.shop.byCollection}</a
          >
        </DropdownMenuItem>
        <div class="h-0.5 w-10 bg-white"></div>
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/{page.params.country}/shop/products" onclick={closeDropdown}
            >{common.header.pages.shop.byProduct}</a
          >
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </li>
  <li>
    <a href="/{page.params.country}/about">{common.header.pages.about}</a>
  </li>
  <li class="logo">
    {@render headerLogo()}
  </li>
  <li>
    <a href="/{page.params.country}/contact">{common.header.pages.contact}</a>
  </li>
  <li>
    <a class="h-full" href="/{page.params.country}/faq">{common.header.pages.faq}</a>
  </li>
</ul>

<div class="mt-5 xl:hidden">
  {@render headerLogo()}
</div>

<style>
  li:not(.logo) {
    position: relative;

    &::after {
      position: absolute;
      bottom: -0.25rem;
      left: 50%;
      translate: -50% 0;
      scale: 0;
      transition: scale 300ms ease-in-out;
      background: #fff;
      width: 100%;
      height: 2px;
      pointer-events: none;
      content: '';
    }

    @media (hover: hover) and (pointer: fine) {
      &:has(:hover)::after {
        translate: -50% 0;
        scale: 1;
      }
    }
  }
</style>
