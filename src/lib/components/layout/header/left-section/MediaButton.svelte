<script lang="ts">
  import { type IconType } from "svelte-icons-pack";
  import HeaderIcon from "$lib/components/layout/header/HeaderIcon.svelte";

  interface Props {
    src: IconType;
    href: string;
  }

  let { src, href }: Props = $props();
</script>

<a {href} target="_blank" class="h-fit w-fit">
  <HeaderIcon {src} />
</a>
