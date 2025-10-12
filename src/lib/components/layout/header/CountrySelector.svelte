<script lang="ts">
  import { ChevronDownIcon, Icon } from '$components-svg-icons';
  import type { Country } from '$types';
  import { CustomSelect } from '$components';
  import { page } from '$app/state';
  import { untrack } from 'svelte';

  type Props = {
    countries: Country[];
  };

  let { countries }: Props = $props();

  const countriesCodes = countries.map((country) => country.code);

  let selectedCountry = $state(countriesCodes.indexOf((page.params.country ?? '').toUpperCase()));
  let isOpen = $state(false);

  $effect(() => {
    const newCountry = countriesCodes[selectedCountry].toLowerCase();
    if (newCountry !== untrack(() => page.params.country)) {
      /* eslint-disable-next-line svelte/prefer-svelte-reactivity */
      const newURL = new URL(untrack(() => page.url));
      const pathSegments = newURL.pathname.split('/').filter((segment) => segment !== '');
      pathSegments[0] = newCountry;
      newURL.pathname = `/${pathSegments.join('/')}`;
      window.location.assign(newURL);
    }
  });
</script>

<CustomSelect
  optionClass="flex w-15 items-center justify-center gap-1"
  options={countriesCodes}
  triggerClass="flex w-15 items-center justify-center bg-background"
  bind:selected={selectedCountry}
  bind:isOpen
>
  {#snippet triggerElement()}
    <div class="flex items-center gap-1">
      {countriesCodes[selectedCountry]}
      <img
        alt="{countriesCodes[selectedCountry]} flag"
        height="13"
        src="/flags/{countriesCodes[selectedCountry].toLowerCase()}.svg"
        width="13"
      />
    </div>
    <Icon class={['duration-300', isOpen && 'rotate-180']} size={15} src={ChevronDownIcon} />
  {/snippet}
  {#snippet optionSnippet(text: string)}
    <span>{text}</span>
    <img alt="{text} flag" height="3" src="/flags/{text.toLowerCase()}.svg" width="13" />
  {/snippet}
</CustomSelect>
