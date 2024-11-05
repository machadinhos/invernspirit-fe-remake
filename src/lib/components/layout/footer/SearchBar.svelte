<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { SlMagnifier } from 'svelte-icons-pack/sl';
  import { containsXSSPatterns } from '$lib/utils/input-validation';
  import { content } from '$lib/content/content';

  let searchString = $state('');

  function doSearch() {
    if (containsXSSPatterns(searchString) || searchString === '') return;
    alert('todo');
  }
</script>

<form class="flex w-full" onsubmit={doSearch}>
  <div class="flex w-full items-center bg-background">
    <div class="px-2">
      <Icon src={SlMagnifier} size="20" color="white" />
    </div>
    <input
      name="searchString"
      autocomplete="off"
      type="search"
      bind:value={searchString}
      class="w-full bg-background text-white focus:border-none focus:outline-none"
      placeholder={content.common.footer.searchBarPlaceholder}
    />
  </div>
  <Button type="submit" className="flex w-20 justify-center"
    >{content.common.footer.searchButton}</Button
  >
</form>
