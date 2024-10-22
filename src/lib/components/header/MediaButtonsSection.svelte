<script lang="ts">
  import MediaButton from '$lib/components/header/MediaButton.svelte';
  import { FaBrandsInstagram, FaBrandsYoutube, FaBrandsPinterestP } from 'svelte-icons-pack/fa';
  import { socialMediaLinks } from '$lib/utils/links';
  import NewsletterSub from '$lib/components/header/NewsletterSub.svelte';
</script>

<div class="mx-10 flex w-fit gap-4">
  <NewsletterSub />
  <div class="h-9 w-0.5 bg-white" />
  <MediaButton src={FaBrandsInstagram} href={socialMediaLinks.instagram} />
  <MediaButton src={FaBrandsPinterestP} href={socialMediaLinks.pinterestP} />
  <MediaButton src={FaBrandsYoutube} href={socialMediaLinks.youtube} />
</div>
