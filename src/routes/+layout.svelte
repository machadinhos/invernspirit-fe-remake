<script>
  import '../app.css';
  import Header from '$lib/components/layout/header/Header.svelte';
  import Footer from '$lib/components/layout/footer/Footer.svelte';
</script>

<Header />

<main>
  <slot />
</main>

<Footer />
