<script lang="ts">
  import type { Snippet } from "svelte";
  import BaseInput from "$lib/components/ui/input/BaseInput.svelte";
  import PasswordTextInput from "$lib/components/ui/input/PasswordTextInput.svelte";

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
  <BaseInput
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
