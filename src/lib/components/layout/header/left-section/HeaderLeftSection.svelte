<script>
  import MediaButtonsSection from "$lib/components/layout/header/left-section/MediaButtonsSection.svelte";
  import NewsletterSub from "$lib/components/layout/header/left-section/Newsletter.svelte";
</script>

<div class="flex gap-4">
  <NewsletterSub />
  <div class="h-9 w-0.5 bg-white"></div>
  <MediaButtonsSection />
</div>
