<script lang="ts">
  import HeaderIcon from "$lib/components/layout/header/HeaderIcon.svelte";
  import { BiSolidCart } from "svelte-icons-pack/bi";
  import { FaSolidUser } from "svelte-icons-pack/fa";
  import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte";

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();

  function handleIconClick() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }
</script>

<div class="flex items-center justify-end gap-4">
  <select class="h-fit bg-background text-white">
    <option>pt</option>
    <option>es</option>
  </select>
  <div>
    <HeaderIcon
      bind:ref={dropdownTriggerElement}
      src={FaSolidUser}
      onclick={handleIconClick}
    />
    <DropdownMenu
      className="p-5"
      bind:isOpen
      triggerElement={dropdownTriggerElement}
    >
      <div class="flex flex-col gap-4">
        <DropdownMenuItem>
          <button onclick={() => (isOpen = false)}>
            <a class="hover:text-primary" href="/sign-in">Sign In</a>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onclick={() => (isOpen = false)}>
            <a class="hover:text-primary" href="/sign-up">Sign Up</a>
          </button>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  </div>
  <a href="/" class="h-fit w-fit">
    <HeaderIcon src={BiSolidCart} />
  </a>
</div>
