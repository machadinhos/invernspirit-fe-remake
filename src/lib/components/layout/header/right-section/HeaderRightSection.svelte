<script lang="ts">
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import DropdownMenu from '$components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuItem from '$components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import { content } from '$content';
  import { countries } from '$lib/constants/countries';
  import cart from '$lib/state/cart.svelte';
  import { BiSolidCart } from 'svelte-icons-pack/bi';
  import { FaSolidUser } from 'svelte-icons-pack/fa';

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
      onclick={handleIconClick}
      src={FaSolidUser}
    />
    <DropdownMenu bind:isOpen className="p-5" triggerElement={dropdownTriggerElement}>
      <div class="flex flex-col gap-4">
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/sign-in" onclick={() => (isOpen = false)}>{content.auth.signIn.title}</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/sign-up" onclick={() => (isOpen = false)}>{content.auth.signUp.title}</a>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </div>
  <a aria-label={content.common.header.rightSection.areaLabels.cart} class="h-fit w-fit" href="/">
    <HeaderIcon badge={cart.value.length > 0 ? `${cart.value.length}` : ''} src={BiSolidCart} type="div" />
  </a>
</div>
