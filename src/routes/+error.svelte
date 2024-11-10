<script>
  import { page } from '$app/stores';
  import Button from '$components/ui/Button.svelte';
  import { content } from '$content';
</script>

<div class="flex h-full flex-col items-center justify-center">
  <h1>{$page.status}: {$page.error?.message || content.common.errorPage.messageAlternative}</h1>

  {#if $page.status === 404}
    <p>{content.common.errorPage['404Message']}</p>
  {:else}
    <p>{content.common.errorPage.otherErrorMessage}</p>
  {/if}

  <a href="/"><Button>{content.common.errorPage.button}</Button></a>
</div>
