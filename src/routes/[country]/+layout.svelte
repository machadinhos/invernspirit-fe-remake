<script lang="ts">
  import { config } from '$state';
  import Footer from '$lib/components/layout/footer/Footer.svelte';
  import Header from '$lib/components/layout/header/Header.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  onMount(() => {
    config.init(page.params.country);
  });
</script>

<div class="fixed inset-0 z-10 flex flex-col">
  <Header />

  <main class="flex-1 overflow-auto">
    {@render children()}
  </main>

  <Footer />
</div>
