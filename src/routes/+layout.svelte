<script lang="ts">
  import '../app.css';

  import Footer from '$components/layout/footer/Footer.svelte';
  import Header from '$components/layout/header/Header.svelte';
  import GrainyFilter from '$components/ui/GrainyFilter.svelte';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="pointer-events-none fixed inset-0 -z-10 select-none">
  <GrainyFilter>
    <div
      class="grainy h-screen w-screen bg-background bg-contain bg-center bg-no-repeat brightness-[25%]"
      style="background-image: url('/images/logo.webp')"
    ></div>
    <div class="absolute inset-0 bg-background opacity-75 brightness-50"></div>
  </GrainyFilter>
</div>

<div class="fixed inset-0 z-10 flex flex-col">
  <Header />

  <main class="flex-1 overflow-auto">
    {@render children()}
  </main>

  <Footer />
</div>
