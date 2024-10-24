<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/layout/header/Header.svelte";
  import Footer from "$lib/components/layout/footer/Footer.svelte";

  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<Header />

<main>
  {@render children()}
</main>

<Footer />
