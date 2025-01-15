<script lang="ts">
  import { auth, common } from '$content';
  import { DropdownMenu, DropdownMenuItem } from '$components';
  import { BiSolidCart } from 'svelte-icons-pack/bi';
  import { cart } from '$state';
  import { countries } from '$constants';
  import { FaSolidUser } from 'svelte-icons-pack/fa';
  import { goto } from '$app/navigation';
  import HeaderIcon from '../HeaderIcon.svelte';
  import { page } from '$app/state';
  import { untrack } from 'svelte';

  let selectedCountry = $state(page.params.country.toUpperCase());
  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();

  $effect(() => {
    const newCountry = selectedCountry.toLowerCase();
    if (newCountry !== untrack(() => page.params.country)) {
      const newURL = new URL(untrack(() => page.url));
      const pathSegments = newURL.pathname.split('/').filter((segment) => segment !== '');
      pathSegments[0] = newCountry;
      newURL.pathname = `/${pathSegments.join('/')}`;
      goto(newURL);
    }
  });

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
    bind:value={selectedCountry}
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
          <a class="hover:text-primary" href="/{page.params.country}/sign-in" onclick={() => (isOpen = false)}
            >{auth.signIn.title}</a
          >
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a class="hover:text-primary" href="/{page.params.country}/sign-up" onclick={() => (isOpen = false)}
            >{auth.signUp.title}</a
          >
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </div>
  <a class="h-fit w-fit" aria-label={common.header.rightSection.areaLabels.cart} href="/{page.params.country}/cart">
    <HeaderIcon badge={cart.size > 0 ? `${cart.size}` : ''} src={BiSolidCart} type="div" />
  </a>
</div>
