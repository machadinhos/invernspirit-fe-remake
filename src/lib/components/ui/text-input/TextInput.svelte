<script lang="ts">
  import type { Snippet } from 'svelte';
  import BaseTextInput from '$lib/components/ui/text-input/BaseTextInput.svelte';
  import PasswordTextInput from '$lib/components/ui/text-input/PasswordTextInput.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props {
    value: string;
    type: import('svelte/elements').HTMLInputTypeAttribute;
    autocomplete: HTMLInputAttributes['autocomplete'];
    name: HTMLInputAttributes['name'];
    required?: boolean;
    label?: Snippet;
    trailingIcon?: Snippet;
    className?: string;
    invalid?: boolean;
    invalidText?: string;
    onblur?: () => void;
  }

  let {
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
    onblur = () => {}
  }: Props = $props();
</script>

{#if type === 'password'}
  <PasswordTextInput
    bind:value
    {autocomplete}
    {label}
    {name}
    {className}
    {invalid}
    {invalidText}
    {required}
    {onblur}
  />
{:else}
  <BaseTextInput
    {trailingIcon}
    {type}
    {name}
    {autocomplete}
    bind:value
    {label}
    {className}
    {invalid}
    {invalidText}
    {required}
    {onblur}
  />
{/if}
