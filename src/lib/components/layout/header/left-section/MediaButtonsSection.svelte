<script lang="ts">
  import {
    FaBrandsInstagram,
    FaBrandsYoutube,
    FaBrandsPinterestP
  } from "svelte-icons-pack/fa";
  import { socialMediaLinks } from "$lib/constants/links";
  import MediaButton from "$lib/components/layout/header/left-section/MediaButton.svelte";
</script>

<MediaButton src={FaBrandsInstagram} href={socialMediaLinks.instagram} />
<MediaButton src={FaBrandsPinterestP} href={socialMediaLinks.pinterestP} />
<MediaButton src={FaBrandsYoutube} href={socialMediaLinks.youtube} />
