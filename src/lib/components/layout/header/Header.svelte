<script>
  import HeaderLeftSection from './left-section/HeaderLeftSection.svelte';
  import HeaderMiddleSection from './middle-section/HeaderMiddleSection.svelte';
  import HeaderRightSection from './right-section/HeaderRightSection.svelte';
</script>

<header>
  <div class="z-10 mx-10 flex justify-between">
    <HeaderLeftSection />
    <HeaderMiddleSection />
    <HeaderRightSection />
  </div>
</header>
