<script lang="ts">
  import { Icon, type IconType } from 'svelte-icons-pack';
  import { auth } from '$content';
  import { FaBrandsGoogle } from 'svelte-icons-pack/fa';
</script>

{#snippet oAuthButton(src: IconType)}
  <button class="oauth-button flex h-[25px] w-[25px] items-center justify-center" type="button">
    <div class="transition-all"><Icon size="20" {src}></Icon></div>
  </button>
{/snippet}

<div class="flex flex-col justify-center gap-4">
  <div class="mt-8 flex items-center gap-2">
    <div class="h-0.5 w-full bg-white"></div>
    {auth.orOAuth}
    <div class="h-0.5 w-full bg-white"></div>
  </div>
  <div class="flex justify-center gap-3">
    {@render oAuthButton(FaBrandsGoogle)}
  </div>
</div>

<style>
  .oauth-button:hover > div {
    scale: 125%;
  }
</style>
