<script lang="ts">
  import NavButton from '$lib/components/header/NavButton.svelte';
  import DropdownLarge from '$lib/components/header/DropdownLarge.svelte';

  let shopList = [
    { name: 'By Collection', link: '/shop1' },
    { name: 'By Product', link: '/shop2' }
  ];
</script>

<nav class="flex items-center justify-center">
  <ul class="flex gap-20">
    <NavButton etiquette="shop" isDropdown={true}>
      <DropdownLarge items={shopList} />
    </NavButton>
    <NavButton etiquette="about" isDropdown={false} />
    <li>IMAGEM</li>
    <NavButton etiquette="contacts" isDropdown={false} />
    <NavButton etiquette="faq" isDropdown={false} />
  </ul>
</nav>
