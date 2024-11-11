<script lang="ts">
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import { BiSolidCart } from 'svelte-icons-pack/bi';
  import { FaSolidUser } from 'svelte-icons-pack/fa';
  import DropdownMenu from '$components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuItem from '$components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import cart from '$lib/state/cart.svelte';
  import { content } from '$content';
  import { countries } from '$lib/constants/countries';

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();

  function handleIconClick() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<div class="mt-8 flex items-center justify-end gap-4">
  <select
    aria-label={content.common.header.rightSection.areaLabels.countrySelect}
    class="h-fit bg-background text-white"
  >
    {#each countries as country}
      <option>{country}</option>
    {/each}
  </select>
  <div>
    <HeaderIcon
      aria-label={content.common.header.rightSection.areaLabels.user}
      bind:ref={dropdownTriggerElement}
      src={FaSolidUser}
      onclick={handleIconClick}
    />
    <DropdownMenu className="p-5" bind:isOpen triggerElement={dropdownTriggerElement}>
      <div class="flex flex-col gap-4">
        <DropdownMenuItem>
          <a onclick={() => (isOpen = false)} class="hover:text-primary" href="/sign-in">{content.auth.signIn.title}</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a onclick={() => (isOpen = false)} class="hover:text-primary" href="/sign-up">{content.auth.signUp.title}</a>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </div>
  <a aria-label={content.common.header.rightSection.areaLabels.cart} href="/" class="h-fit w-fit">
    <HeaderIcon type="div" src={BiSolidCart} badge={cart.value.length > 0 ? `${cart.value.length}` : ''} />
  </a>
</div>
