<script>
  import { SlMagnifier } from 'svelte-icons-pack/sl';
  import { content } from '$content';
  import { Icon } from 'svelte-icons-pack';
  import Button from '$components/ui/Button.svelte';
  import { containsXSSPatterns } from '$lib/utils/input-validation';

  let searchString = $state('');

  function doSearch() {
    if (containsXSSPatterns(searchString) || searchString === '') return;
    alert('todo');
  }
</script>

<footer class="w-full">
  <form class="flex w-full" onsubmit={doSearch}>
    <div class="flex w-full items-center bg-background">
      <div class="px-2">
        <Icon src={SlMagnifier} size="20" color="white" />
      </div>
      <input
        aria-label={content.common.footer.searchBarPlaceholder}
        name="searchString"
        autocomplete="off"
        type="search"
        bind:value={searchString}
        class="w-full bg-background text-white focus:border-none focus:outline-none"
        placeholder={content.common.footer.searchBarPlaceholder}
      />
    </div>
    <Button type="submit" className="flex w-20 justify-center">{content.common.footer.searchButton}</Button>
  </form>
</footer>
