<script lang="ts">
  import NavButton from '$lib/components/header/NavButton.svelte';
</script>

<nav class="flex items-center justify-center">
  <ul class="flex gap-20">
    <NavButton etiquette="shop" />
    <NavButton etiquette="about" />
    <li>IMAGEM</li>
    <NavButton etiquette="contacts" />
    <NavButton etiquette="faq" />
  </ul>
</nav>
