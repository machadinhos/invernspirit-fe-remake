<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import { modal } from '$state';
  import ModalBody from './ModalBody.svelte';
  import { scale } from 'svelte/transition';

  const dialogAttachment: Attachment<HTMLDialogElement> = (node: HTMLDialogElement) => {
    node.showModal();
  };

  const onclose = (): void => {
    modal.value?.close();
  };
</script>

{#if modal.value}
  <dialog class="w-fit" {@attach dialogAttachment} closedby="any" {onclose} in:scale|global>
    <ModalBody modal={modal.value} />
  </dialog>
{/if}

<style>
  dialog {
    margin: auto;
    max-width: none;

    &::backdrop {
      backdrop-filter: blur(8px);
      transition: opacity 0.3s ease-in-out;
      background: #0000004d;
      @starting-style {
        opacity: 0;
      }
    }
  }
</style>
