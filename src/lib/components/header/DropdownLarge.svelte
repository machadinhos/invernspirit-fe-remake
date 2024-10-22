<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  export let thickness = '1px';
  export let color = '#ccc';
  export let margin = '10px 0';
  export let items: { name: string; link: string }[];
</script>

<div
  class="absolute start-0 mt-2 grid w-full grid-cols-1 content-evenly rounded-md bg-background shadow-2xl"
  transition:slide={{ duration: 800, easing: quartOut }}
>
  <div class="mx-auto max-w-screen-xl px-2 py-4 text-white md:px-6">
    <ul>
      <!--todo: center items y axis, animate items sliding (appearing) from bottom to top-->
      {#each items as item, index}
        <li
          class="cursor-pointer"
          transition:slide={{ duration: 300, easing: quartOut, delay: 5800 }}
        >
          <a href={item.link} class="block rounded-lg p-3 hover:text-amber-600">
            <div class="font-semibold">{item.name}</div>
            <!--				<span class="text-sm text-gray-500 dark:text-gray-400">Connect with third-party tools that you're already using.</span>-->
          </a>
          {#if index !== items.length - 1}
            <hr style="border: none; border-top: {thickness} solid {color}; margin: {margin};" />
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<!--<div class="absolute bg-white text-black p-2 rounded-md shadow-md">
	<ul>
		{#each items as item}
			<li class="cursor-pointer hover:bg-gray-200 p-2">
				<a href = {item.link}>{item.name}</a>
			</li>
			<div class="grid grid-cols-1 divide-error"></div>
		{/each}
	</ul>
</div>-->
