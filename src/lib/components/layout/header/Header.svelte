<script>
  import HeaderLeftSection from '$components/layout/header/left-section/HeaderLeftSection.svelte';
  import HeaderMiddleSection from '$components/layout/header/middle-section/HeaderMiddleSection.svelte';
  import HeaderRightSection from '$components/layout/header/right-section/HeaderRightSection.svelte';
</script>

<header>
  <div style="grid-template-columns: 1fr auto 1fr" class="z-10 mx-10 grid">
    <HeaderLeftSection />
    <HeaderMiddleSection />
    <HeaderRightSection />
  </div>
</header>
