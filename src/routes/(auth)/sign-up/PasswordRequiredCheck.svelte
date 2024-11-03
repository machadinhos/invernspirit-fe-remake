<script lang="ts">
  import { FaSolidCheck, FaSolidX } from 'svelte-icons-pack/fa';
  import { Icon } from 'svelte-icons-pack';

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
