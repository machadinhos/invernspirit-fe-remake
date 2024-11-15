<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { FaSolidCheck, FaSolidX } from 'svelte-icons-pack/fa';

  interface Props {
    text: string;
    error?: boolean;
  }

  let { text, error = false }: Props = $props();

  let iconSrc = $derived(error ? FaSolidX : FaSolidCheck);
</script>

<div class="flex items-center gap-2">
  <div class={error ? 'text-error' : 'text-success'}>
    <Icon src={iconSrc} />
  </div>
  {text}
</div>
