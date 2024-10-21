<script lang="ts">
  import { Icon, type IconType } from 'svelte-icons-pack';
  export let src: IconType;
  export let href: string;
</script>

<div class="transition-transform duration-300 ease-out hover:scale-150">
  <a {href} target="_blank">
    <Icon color="white" {src} size="20" />
  </a>
</div>
