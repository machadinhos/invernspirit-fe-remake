<script lang="ts">
  import '../app.css';
  import { GrainyFilter, LoadingScreen } from '$components';
  import { loading } from '$state';
  import { page } from '$app/state';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  <!-- Prevent search engine indexing by setting `noCrawl: true` in page/layout load functions (e.g., +page.js, +page.server.js, +layout.js, +layout.server.js) -->
  {#if !page.data.noCrawl}
    <meta name="robots" content="index,follow" />
  {:else}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
</svelte:head>

{#if loading.value}
  <LoadingScreen />
{/if}

<div class="pointer-events-none fixed inset-0 -z-10 select-none">
  <GrainyFilter>
    <div
      style="background-image: url('/images/logo.webp')"
      class="h-screen w-screen bg-background bg-contain bg-center bg-no-repeat brightness-[25%]"
    ></div>
    <div class="absolute inset-0 bg-background opacity-75 brightness-50"></div>
  </GrainyFilter>
</div>

{@render children()}
