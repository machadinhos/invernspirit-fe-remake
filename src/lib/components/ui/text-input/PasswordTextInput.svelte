<script lang="ts">
  import type { Snippet } from "svelte";
  import { FaEye, FaEyeSlash } from "svelte-icons-pack/fa";
  import { Icon } from "svelte-icons-pack";
  import BaseInput from "$lib/components/ui/text-input/BaseTextInput.svelte";

  interface Props {
    value: string;
    label?: Snippet;
    className?: string;
    invalid?: boolean;
    invalidText?: string;
    required?: boolean;
    onblur?: () => void;
  }

  let {
    value = $bindable(),
    label,
    className = "",
    invalid = false,
    invalidText,
    required = false,
    onblur = () => {}
  }: Props = $props();

  let shown = $state(false);
</script>

<BaseInput
  type={shown ? "text" : "password"}
  bind:value
  {label}
  {className}
  {invalid}
  {invalidText}
  {required}
  {onblur}
>
  {#snippet trailingIcon()}
    <button type="button" onclick={() => (shown = !shown)}>
      <Icon src={shown ? FaEye : FaEyeSlash} />
    </button>
  {/snippet}
</BaseInput>
