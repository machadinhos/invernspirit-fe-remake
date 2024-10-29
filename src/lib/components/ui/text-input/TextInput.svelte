<script lang="ts">
  import type { Snippet } from "svelte";
  import BaseTextInput from "$lib/components/ui/text-input/BaseTextInput.svelte";
  import PasswordTextInput from "$lib/components/ui/text-input/PasswordTextInput.svelte";

  interface Props {
    value: string;
    type: import("svelte/elements").HTMLInputTypeAttribute;
    label?: Snippet;
    trailingIcon?: Snippet;
    className?: string;
    invalid?: boolean;
    invalidText?: string;
    required?: boolean;
    onblur?: () => void;
  }

  let {
    value = $bindable(),
    type,
    label,
    trailingIcon,
    className = "",
    invalid = false,
    invalidText,
    required = false,
    onblur = () => {}
  }: Props = $props();
</script>

{#if type === "password"}
  <PasswordTextInput
    bind:value
    {label}
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
    bind:value
    {label}
    {className}
    {invalid}
    {invalidText}
    {required}
    {onblur}
  />
{/if}
