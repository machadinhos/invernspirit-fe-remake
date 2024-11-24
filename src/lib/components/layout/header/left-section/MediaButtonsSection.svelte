<script lang="ts">
  import { FaBrandsInstagram, FaBrandsPinterestP, FaBrandsYoutube } from 'svelte-icons-pack/fa';
  import { content } from '$content';
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import type { IconType } from 'svelte-icons-pack';
  import { socialMediaLinks } from '$lib/constants/links';
</script>

{#snippet mediaButton(src: IconType, href: HTMLAnchorElement['href'], ariaLabel: HTMLAnchorElement['ariaLabel'])}
  <a class="h-fit w-fit" aria-label={ariaLabel} {href} target="_blank">
    <HeaderIcon {src} type="div" />
  </a>
{/snippet}

{@render mediaButton(
  FaBrandsInstagram,
  socialMediaLinks.instagram,
  content.common.header.leftSection.areaLabels.instagram,
)}
{@render mediaButton(
  FaBrandsPinterestP,
  socialMediaLinks.pinterestP,
  content.common.header.leftSection.areaLabels.pinterest,
)}
{@render mediaButton(FaBrandsYoutube, socialMediaLinks.youtube, content.common.header.leftSection.areaLabels.youtube)}
