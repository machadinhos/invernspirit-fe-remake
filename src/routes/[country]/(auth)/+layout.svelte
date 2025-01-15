<script lang="ts">
  import { auth } from '$content';
  import { page } from '$app/state';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let selected = $derived(page.url.pathname.slice(1));
</script>

{#snippet pageListItem(href: 'sign-in' | 'sign-up')}
  <li style="font-size: 2.5rem" class="w-1/2 text-center">
    <a
      class="block w-full pt-4 transition-opacity duration-500 {selected === href ? 'opacity-100' : 'opacity-50'}"
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

<div class="flex h-full w-full justify-center">
  <div
    class="mt-10 flex h-fit w-[95%] flex-col items-center bg-background shadow-2xl sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[30%]"
  >
    <div class="relative w-full">
      <ul class="flex w-full">
        {@render pageListItem('sign-in')}
        {@render pageListItem('sign-up')}
      </ul>
      <div
        style="left: {selected === 'sign-in' ? '7.5%' : '57.5%'}"
        class="pointer-events-none absolute bottom-0.5 h-0.5 w-[35%] select-none bg-white transition-all duration-500"
      ></div>
    </div>
    <div class="mb-10 mt-5 w-[75%]">
      {@render children()}
    </div>
  </div>
</div>
