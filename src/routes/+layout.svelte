<script>
  import '../app.css';
  import MediaButtonsSection from '$lib/components/header/MediaButtonsSection.svelte';
  import Navbar from '$lib/components/header/Navbar.svelte';
  import SearchBar from '$lib/components/footer/SearchBar.svelte';
</script>

<header>
  <div class="relative z-10 my-10 grid" style="grid-template-columns: 1fr auto 1fr;">
    <MediaButtonsSection />
    <Navbar />
    <div></div>
  </div>
</header>

<main>
  <slot />
</main>

<footer class="absolute bottom-0 w-full">
  <SearchBar />
</footer>
