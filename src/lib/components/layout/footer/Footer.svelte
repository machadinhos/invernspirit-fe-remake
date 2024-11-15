<script>
  import Button from '$components/ui/Button.svelte';
  import { content } from '$content';
  import { containsXSSPatterns } from '$lib/utils/input-validation';
  import { Icon } from 'svelte-icons-pack';
  import { SlMagnifier } from 'svelte-icons-pack/sl';

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
        <Icon color="white" size="20" src={SlMagnifier} />
      </div>
      <input
        aria-label={content.common.footer.searchBarPlaceholder}
        autocomplete="off"
        bind:value={searchString}
        class="w-full bg-background text-white focus:border-none focus:outline-none"
        name="searchString"
        placeholder={content.common.footer.searchBarPlaceholder}
        type="search"
      />
    </div>
    <Button className="flex w-20 justify-center" type="submit">{content.common.footer.searchButton}</Button>
  </form>
</footer>
