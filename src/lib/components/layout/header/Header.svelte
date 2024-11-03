<script>
  import HeaderLeftSection from '$lib/components/layout/header/left-section/HeaderLeftSection.svelte';
  import HeaderMiddleSection from '$lib/components/layout/header/middle-section/HeaderMiddleSection.svelte';
  import HeaderRightSection from '$lib/components/layout/header/right-section/HeaderRightSection.svelte';
</script>

<header>
  <div class="z-10 mx-10 grid" style="grid-template-columns: 1fr auto 1fr">
    <HeaderLeftSection />
    <HeaderMiddleSection />
    <HeaderRightSection />
  </div>
</header>
