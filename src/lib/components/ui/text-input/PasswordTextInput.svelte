<script lang="ts">
  import type { Snippet } from 'svelte';
  import { FaEye, FaEyeSlash } from 'svelte-icons-pack/fa';
  import { Icon } from 'svelte-icons-pack';
  import BaseInput from '$components/ui/text-input/BaseTextInput.svelte';
  import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
  import { content } from '$content';

  interface Props {
    id: HTMLInputAttributes['id'];
    value: string;
    autocomplete: HTMLInputAttributes['autocomplete'];
    label?: Snippet;
    name: HTMLInputAttributes['name'];
    className?: HTMLAttributes<HTMLElement>['class'];
    invalid?: boolean;
    invalidText?: string;
    required?: boolean;
    onblur?: () => void;
  }

  let {
    id,
    value = $bindable(),
    label,
    name,
    autocomplete,
    className = '',
    invalid = false,
    invalidText,
    required = false,
    onblur = () => {}
  }: Props = $props();

  let shown = $state(false);
</script>

<BaseInput
  {id}
  type={shown ? 'text' : 'password'}
  bind:value
  {autocomplete}
  {label}
  {name}
  {className}
  {invalid}
  {invalidText}
  {required}
  {onblur}
>
  {#snippet trailingIcon()}
    <button aria-label={content.common.hidePasswordButtonAriaLabel} type="button" onclick={() => (shown = !shown)}>
      <Icon src={shown ? FaEye : FaEyeSlash} />
    </button>
  {/snippet}
</BaseInput>
