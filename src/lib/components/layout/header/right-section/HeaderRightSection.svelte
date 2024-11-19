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
    class="h-fit bg-background text-white"
    aria-label={content.common.header.rightSection.areaLabels.countrySelect}
  >
    {#each countries as country}
      <option>{country}</option>
    {/each}
  </select>
  <div>
    <HeaderIcon
      aria-label={content.common.header.rightSection.areaLabels.user}
      onclick={handleIconClick}
      src={FaSolidUser}
      bind:ref={dropdownTriggerElement}
    />
    <DropdownMenu className="p-5" triggerElement={dropdownTriggerElement} bind:isOpen>
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
  <a class="h-fit w-fit" aria-label={content.common.header.rightSection.areaLabels.cart} href="/">
    <HeaderIcon badge={cart.value.length > 0 ? `${cart.value.length}` : ''} src={BiSolidCart} type="div" />
  </a>
</div>
