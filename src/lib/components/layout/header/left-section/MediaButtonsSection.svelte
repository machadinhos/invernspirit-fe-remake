<script lang="ts">
  import { FaBrandsInstagram, FaBrandsYoutube, FaBrandsPinterestP } from 'svelte-icons-pack/fa';
  import { socialMediaLinks } from '$lib/constants/links';
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import type { IconType } from 'svelte-icons-pack';
</script>

{#snippet mediaButton(src: IconType, href: string)}
  <a {href} target="_blank" class="h-fit w-fit">
    <HeaderIcon {src} />
  </a>
{/snippet}

{@render mediaButton(FaBrandsInstagram, socialMediaLinks.instagram)}
{@render mediaButton(FaBrandsPinterestP, socialMediaLinks.pinterestP)}
{@render mediaButton(FaBrandsYoutube, socialMediaLinks.youtube)}
