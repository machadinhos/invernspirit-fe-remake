<script>
  import '../app.css';
  import {
    FaNewspaper,
    FaBrandsInstagram,
    FaBrandsYoutube,
    FaBrandsPinterestP
  } from 'svelte-icons-pack/fa';
  import MediaButton from '$lib/components/header/MediaButton.svelte';
  import { socialMediaLinks } from '$lib/utils/links';
</script>

<header>
  <div class="relative z-10 mx-10 my-10 flex w-fit gap-4">
    <!--    todo: add newsletter popup-->
    <MediaButton src={FaNewspaper} href={socialMediaLinks.youtube} />
    <div class="h-5 w-0.5 bg-white" />
    <MediaButton src={FaBrandsInstagram} href={socialMediaLinks.instagram} />
    <MediaButton src={FaBrandsPinterestP} href={socialMediaLinks.pinterestP} />
    <MediaButton src={FaBrandsYoutube} href={socialMediaLinks.youtube} />
  </div>
  <navbar></navbar>
</header>

<slot />
