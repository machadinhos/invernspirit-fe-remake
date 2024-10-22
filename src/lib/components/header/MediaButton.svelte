<script lang="ts">
  import { type IconType } from 'svelte-icons-pack';
  import HeaderIcon from '$lib/components/header/HeaderIcon.svelte';

  export let src: IconType;
  export let href: string;
</script>

<a {href} target="_blank" class="h-fit w-fit">
  <HeaderIcon {src} />
</a>
