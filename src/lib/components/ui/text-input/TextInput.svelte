<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
  import BaseTextInput from './BaseTextInput.svelte';
  import PasswordTextInput from './PasswordTextInput.svelte';
  import type { Snippet } from 'svelte';

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
    {id}
    {name}
    {autocomplete}
    {className}
    {invalid}
    {invalidText}
    {label}
    {onblur}
    {required}
    bind:value
  />
{:else}
  <BaseTextInput
    {id}
    {name}
    {autocomplete}
    {className}
    {invalid}
    {invalidText}
    {label}
    {onblur}
    {required}
    {trailingIcon}
    {type}
    bind:value
  />
{/if}
