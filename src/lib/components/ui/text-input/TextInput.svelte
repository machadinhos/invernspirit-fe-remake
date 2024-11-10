<script lang="ts">
  import type { Snippet } from 'svelte';
  import BaseTextInput from '$components/ui/text-input/BaseTextInput.svelte';
  import PasswordTextInput from '$components/ui/text-input/PasswordTextInput.svelte';
  import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

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
    onblur = () => {}
  }: Props = $props();
</script>

{#if type === 'password'}
  <PasswordTextInput
    {id}
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
    {id}
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
