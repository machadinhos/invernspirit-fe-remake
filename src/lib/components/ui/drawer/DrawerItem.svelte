<script lang="ts">
  import FlyUpElement from '../FlyUpElement.svelte';

  interface Props {
    children: import('svelte').Snippet;
    classNames?: string;
  }

  let { classNames, children }: Props = $props();
</script>

<FlyUpElement {classNames} duration={250}>{@render children()}</FlyUpElement>
