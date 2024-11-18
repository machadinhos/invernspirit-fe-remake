<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

  import BaseTextInput from '$components/ui/text-input/BaseTextInput.svelte';
  import PasswordTextInput from '$components/ui/text-input/PasswordTextInput.svelte';

  interface Props {
    id: HTMLInputAttributes['id'];
    value: string;
    type: import('svelte/elements').HTMLInputTypeAttribute | 'textarea';
    autocomplete: HTMLInputAttributes['autocomplete'];
    name: HTMLInputAttributes['name'];
    required?: boolean;
    label?: Snippet;
    trailingIcon?: Snippet;
    className?: HTMLAttributes<HTMLElement>['class'];
    invalid?: boolean;
    invalidText?: string;
    onblur?: () => void;
  }

  let {
    id,
    value = $bindable(),
    type,
    autocomplete,
    label,
    name,
    trailingIcon,
    className = '',
    invalid = false,
    invalidText,
    required = false,
    onblur = () => {},
  }: Props = $props();
</script>

{#if type === 'password'}
  <PasswordTextInput
    {autocomplete}
    bind:value
    {className}
    {id}
    {invalid}
    {invalidText}
    {label}
    {name}
    {onblur}
    {required}
  />
{:else}
  <BaseTextInput
    {autocomplete}
    bind:value
    {className}
    {id}
    {invalid}
    {invalidText}
    {label}
    {name}
    {onblur}
    {required}
    {trailingIcon}
    {type}
  />
{/if}
