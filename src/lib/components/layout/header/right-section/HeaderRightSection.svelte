<script lang="ts">
  import { auth, common } from '$content';
  import { DropdownMenu, DropdownMenuItem } from '$components';
  import { BiSolidCart } from 'svelte-icons-pack/bi';
  import { cart } from '$state';
  import type { Country } from '$types';
  import CountrySelector from '$lib/components/layout/header/CountrySelector.svelte';
  import { FaSolidUser } from 'svelte-icons-pack/fa';
  import HeaderIcon from '../HeaderIcon.svelte';
  import { page } from '$app/state';

  interface Props {
    countries: Country[];
  }

  let { countries }: Props = $props();

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();

  function handleIconClick() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<div class="mt-8 flex w-20 items-center justify-end gap-4 xl:w-52">
  <div class="hidden xl:block">
    <CountrySelector {countries} />
  </div>
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
