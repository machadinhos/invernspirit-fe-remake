<script lang="ts">
  import { FaEye, FaEyeSlash } from 'svelte-icons-pack/fa';
  import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
  import BaseInput from './BaseTextInput.svelte';
  import { common } from '$content';
  import { Icon } from 'svelte-icons-pack';
  import type { Snippet } from 'svelte';

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
    onblur = () => {},
  }: Props = $props();

  let shown = $state(false);
</script>

<BaseInput
  {id}
  {name}
  {autocomplete}
  {className}
  {invalid}
  {invalidText}
  {label}
  {onblur}
  {required}
  type={shown ? 'text' : 'password'}
  bind:value
>
  {#snippet trailingIcon()}
    <button aria-label={common.hidePasswordButtonAriaLabel} onclick={() => (shown = !shown)} type="button">
      <Icon src={shown ? FaEye : FaEyeSlash} />
    </button>
  {/snippet}
</BaseInput>
