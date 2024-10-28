<script lang="ts">
  import { page } from "$app/stores";

  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  let selected = $derived($page.url.pathname.slice(1));
</script>

<div class="flex h-full w-full items-center justify-center">
  <div class="flex h-[80%] w-[30%] flex-col items-center bg-background">
    <div class="relative w-full">
      <ul class="mt-4 flex w-full">
        <li class="w-1/2 text-center" style="font-size: 2.5rem">
          <a
            href="/sign-in"
            class="block w-full transition-colors duration-500 {selected ===
            'sign-in'
              ? 'text-primary'
              : ''}"
          >
            Sign In
          </a>
        </li>
        <li class="w-1/2 text-center" style="font-size: 2.5rem">
          <a
            href="/sign-up"
            class="block w-full transition-colors duration-500 {selected ===
            'sign-up'
              ? 'text-primary'
              : ''}"
          >
            Sign Up
          </a>
        </li>
      </ul>
      <div
        class="pointer-events-none absolute bottom-0.5 h-0.5 w-[35%] select-none bg-primary transition-all duration-500"
        style="left: {selected === 'sign-in' ? '7.5%' : '57.5%'}"
      ></div>
    </div>
    <div class="mt-5 w-[75%]">
      {@render children()}
    </div>
  </div>
</div>
