<script lang="ts">
  import { FaBrandsInstagram, FaBrandsYoutube, FaBrandsPinterestP } from 'svelte-icons-pack/fa';
  import { socialMediaLinks } from '$lib/constants/links';
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import type { IconType } from 'svelte-icons-pack';
  import { content } from '$content';
</script>

{#snippet mediaButton(src: IconType, href: HTMLAnchorElement['href'], ariaLabel: HTMLAnchorElement['ariaLabel'])}
  <a {href} aria-label={ariaLabel} target="_blank" class="h-fit w-fit">
    <HeaderIcon type="div" {src} />
  </a>
{/snippet}

{@render mediaButton(
  FaBrandsInstagram,
  socialMediaLinks.instagram,
  content.common.header.leftSection.areaLabels.instagram
)}
{@render mediaButton(
  FaBrandsPinterestP,
  socialMediaLinks.pinterestP,
  content.common.header.leftSection.areaLabels.pinterest
)}
{@render mediaButton(FaBrandsYoutube, socialMediaLinks.youtube, content.common.header.leftSection.areaLabels.youtube)}
