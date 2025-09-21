<script lang="ts">
  import { auth } from '$content';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { user } from '$state';

  type Props = {
    children: import('svelte').Snippet;
  };

  let { children }: Props = $props();

  let selected = $derived(page.url.pathname.split('/')[2]);

  onMount(() => {
    if (user.isLoggedIn) goto(`/${page.params.country}`);
  });
</script>

{#snippet pageListItem(href: 'sign-in' | 'sign-up')}
  <li class="w-1/2">
    <a
      class={['block pt-4 transition-all duration-500', selected !== href && 'brightness-50']}
      href={`/${page.params.country}/${href}`}
    >
      {#if href === 'sign-in'}
        {auth.signIn.title}
      {:else}
        {auth.signUp.title}
      {/if}
    </a>
  </li>
{/snippet}

<div
  class="mx-auto mt-4 grid h-fit w-[90%] max-w-[675px] justify-items-center md:mt-10 md:bg-background-dark md:shadow-2xl"
>
  <div class="relative w-full md:pt-10">
    <ul style="font-size: 2.5rem" class="flex text-center">
      {@render pageListItem('sign-in')}
      {@render pageListItem('sign-up')}
    </ul>
    <div
      style="left: {selected === 'sign-in' ? '12.5%' : '62.5%'}"
      class="pointer-events-none absolute bottom-0.5 h-0.5 w-[25%] bg-white transition-[left] duration-500 select-none"
    ></div>
  </div>
  <div class="mt-5 mb-10 w-full md:w-[75%]">
    {@render children()}
  </div>
</div>
