<script>
  import { Button } from '$components';
  import { common } from '$content';
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
        name="searchString"
        class="w-full bg-background text-white focus:border-none focus:outline-none"
        aria-label={common.footer.searchBarPlaceholder}
        autocomplete="off"
        placeholder={common.footer.searchBarPlaceholder}
        type="search"
        bind:value={searchString}
      />
    </div>
    <Button className="flex w-20 justify-center" type="submit">{common.footer.searchButton}</Button>
  </form>
</footer>
