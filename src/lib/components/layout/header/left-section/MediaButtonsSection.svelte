<script lang="ts">
  import { FaBrandsInstagram, FaBrandsPinterestP, FaBrandsYoutube } from 'svelte-icons-pack/fa';
  import { common } from '$content';
  import HeaderIcon from '../HeaderIcon.svelte';
  import type { IconType } from 'svelte-icons-pack';
  import { socialMediaLinks } from '$lib/constants/links';
</script>

{#snippet mediaButton(src: IconType, href: HTMLAnchorElement['href'], ariaLabel: HTMLAnchorElement['ariaLabel'])}
  <a class="h-fit w-fit" aria-label={ariaLabel} {href} target="_blank">
    <HeaderIcon {src} type="div" />
  </a>
{/snippet}

{@render mediaButton(FaBrandsInstagram, socialMediaLinks.instagram, common.header.leftSection.areaLabels.instagram)}
{@render mediaButton(FaBrandsPinterestP, socialMediaLinks.pinterestP, common.header.leftSection.areaLabels.pinterest)}
{@render mediaButton(FaBrandsYoutube, socialMediaLinks.youtube, common.header.leftSection.areaLabels.youtube)}
