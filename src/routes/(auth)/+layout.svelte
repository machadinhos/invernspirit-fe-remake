<script lang="ts">
  import { page } from '$app/stores';
  import { content } from '$content';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let selected = $derived($page.url.pathname.slice(1));
</script>

<div class="flex h-full w-full justify-center">
  <div
    class="mt-10 flex h-fit w-[95%] flex-col items-center bg-background shadow-2xl sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[30%]"
  >
    <div class="relative w-full">
      <ul class="flex w-full">
        <li class="w-1/2 text-center" style="font-size: 2.5rem">
          <a
            href="/sign-in"
            class="block w-full pt-4 transition-opacity duration-500 {selected ===
            'sign-in'
              ? 'opacity-100'
              : 'opacity-50'}"
          >
            {content.auth.signIn.title}
          </a>
        </li>
        <li class="w-1/2 text-center" style="font-size: 2.5rem">
          <a
            href="/sign-up"
            class="block w-full pt-4 transition-opacity duration-500 {selected ===
            'sign-up'
              ? 'opacity-100'
              : 'opacity-50'}"
          >
            {content.auth.signUp.title}
          </a>
        </li>
      </ul>
      <div
        class="pointer-events-none absolute bottom-0.5 h-0.5 w-[35%] select-none bg-white transition-all duration-500"
        style="left: {selected === 'sign-in' ? '7.5%' : '57.5%'}"
      ></div>
    </div>
    <div class="mb-10 mt-5 w-[75%]">
      {@render children()}
    </div>
  </div>
</div>
