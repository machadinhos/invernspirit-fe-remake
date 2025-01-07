<script lang="ts">
  import { auth, common } from '$content';
  import { cart, country } from '$state';
  import { DropdownMenu, DropdownMenuItem } from '$components';
  import { BiSolidCart } from 'svelte-icons-pack/bi';
  import { countries } from '$constants';
  import { FaSolidUser } from 'svelte-icons-pack/fa';
  import HeaderIcon from '../HeaderIcon.svelte';

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
    class="h-fit bg-background"
    aria-label={common.header.rightSection.areaLabels.countrySelect}
    bind:value={country.value}
  >
    {#each countries as country}
      <option>{country}</option>
    {/each}
  </select>
  <div>
    <HeaderIcon
      aria-label={common.header.rightSection.areaLabels.user}
      onclick={handleIconClick}
      src={FaSolidUser}
      bind:ref={dropdownTriggerElement}
    />
    <DropdownMenu className="p-5" triggerElement={dropdownTriggerElement} bind:isOpen>
      <div class="flex flex-col gap-4">
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/sign-in" onclick={() => (isOpen = false)}>{auth.signIn.title}</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/sign-up" onclick={() => (isOpen = false)}>{auth.signUp.title}</a>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </div>
  <a class="h-fit w-fit" aria-label={common.header.rightSection.areaLabels.cart} href="/cart">
    <HeaderIcon badge={cart.size > 0 ? `${cart.size}` : ''} src={BiSolidCart} type="div" />
  </a>
</div>
