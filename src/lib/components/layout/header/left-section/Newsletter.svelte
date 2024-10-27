<script lang="ts">
  import { Icon } from "svelte-icons-pack";
  import { TiMail } from "svelte-icons-pack/ti";
  import Button from "$lib/components/ui/Button.svelte";
  import { validateEmail } from "$lib/utils/general";
  import { FaNewspaper } from "svelte-icons-pack/fa";
  import HeaderIcon from "$lib/components/layout/header/HeaderIcon.svelte";
  import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte";
  import TextInput from "$lib/components/ui/TextInput.svelte";

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();
  let emailInput: string = $state("");
  let isValidEmailInput = $derived(validateEmail(emailInput));

  function handleIconClick() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }

  function subscribeToNewsletter() {
    alert("todo");
  }
</script>

<div>
  <HeaderIcon
    bind:ref={dropdownTriggerElement}
    src={FaNewspaper}
    onclick={handleIconClick}
  />
  <DropdownMenu
    className="w-80"
    bind:isOpen
    triggerElement={dropdownTriggerElement}
  >
    <form class="m-5">
      <DropdownMenuItem>
        <h2>Subscribe to our newsletter</h2>
      </DropdownMenuItem>
      <DropdownMenuItem classNames="w-full">
        <div class="mt-2 w-full">
          <TextInput
            bind:value={emailInput}
            type="email"
            invalid={!isValidEmailInput && emailInput !== ""}
          >
            {#snippet label()}
              <div class="flex">
                <Icon
                  className="pb-1 mr-0.5 flex content-center"
                  color="white"
                  src={TiMail}
                  size="20"
                />
                Email
              </div>
            {/snippet}
          </TextInput>
        </div>
        <p
          class="pointer-events-none select-none {!isValidEmailInput &&
          emailInput !== ''
            ? 'opacity-100'
            : 'opacity-0'} text-error"
        >
          Please enter a valid email address.
        </p>
      </DropdownMenuItem>
      <DropdownMenuItem classNames="w-full">
        <Button
          className="mt-2 w-full"
          type="submit"
          onclick={subscribeToNewsletter}>Subscribe</Button
        >
      </DropdownMenuItem>
    </form>
  </DropdownMenu>
</div>
