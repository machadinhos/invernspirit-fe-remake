<script lang="ts">
  import { config, user } from '$state';
  import { Icon, type IconSrcType, PersonalInformationIcon, ReceiptIcon } from '$components-svg-icons';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { profile } from '$content';

  type Props = {
    children: import('svelte').Snippet;
  };

  let { children }: Props = $props();

  let selected = $derived(page.url.pathname.split('/')[3]);

  onMount(() => {
    config.afterInitialization(() => {
      if (!user.isLoggedIn) goto(`/${page.params.country}`);
    });
  });
</script>

<svelte:head><title>{profile.headTitle}</title></svelte:head>

{#snippet listItem(subPage: string, text: string, icon: IconSrcType)}
  <li class={subPage === selected ? 'bg-background' : 'opacity-50'}>
    <a class="flex w-full gap-2 px-3 py-1" href="/{page.params.country}/profile/{subPage}">
      <Icon src={icon} />
      {text}
    </a>
  </li>
{/snippet}

<div class="mx-auto w-[90%] md:max-w-[900px]">
  <h1 class="mb-9 text-center text-5xl">{profile.title}</h1>
  <div class="flex gap-5 max-md:flex-col">
    <ul class="space-y-2 md:w-44">
      {@render listItem('user-details', profile.links.userDetails, PersonalInformationIcon)}
      {@render listItem('orders', profile.links.orders, ReceiptIcon)}
    </ul>
    <div>
      {@render children()}
    </div>
  </div>
</div>
