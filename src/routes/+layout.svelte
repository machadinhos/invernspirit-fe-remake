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

<footer class="footer sticky bottom-0">
  <SearchBar />
</footer>

<style>
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%; /* Ensure the footer spans the width of the page */
    background-color: #f1f1f1; /* Optional, for better visibility */
    padding: 10px; /* Padding to give some space around the content */
    text-align: center; /* Center-align the search bar */
  }
</style>
