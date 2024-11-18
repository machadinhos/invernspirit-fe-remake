<script lang="ts">
  import type { IconType } from 'svelte-icons-pack';

  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import { content } from '$content';
  import { socialMediaLinks } from '$lib/constants/links';
  import { FaBrandsInstagram, FaBrandsYoutube, FaBrandsPinterestP } from 'svelte-icons-pack/fa';
</script>

{#snippet mediaButton(src: IconType, href: HTMLAnchorElement['href'], ariaLabel: HTMLAnchorElement['ariaLabel'])}
  <a aria-label={ariaLabel} class="h-fit w-fit" {href} target="_blank">
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
