<script lang="ts">
  import { Icon } from "svelte-icons-pack";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { TiMail } from "svelte-icons-pack/ti";
  import Button from "$lib/components/ui/Button.svelte";
  import { validateEmail } from "$lib/utils/general";
  import { FaNewspaper } from "svelte-icons-pack/fa";
  import HeaderIcon from "$lib/components/layout/header/HeaderIcon.svelte";
  import DropdownMenu from "$lib/components/ui/dropdown/DropdownMenu.svelte";
  import DropdownMenuItem from "$lib/components/ui/dropdown/DropdownMenuItem.svelte";

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();
  let isValidEmailInput = $state(true);
  let emailInput: string = $state("");

  function handleIconClick() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }

  function handleInput() {
    isValidEmailInput = validateEmail(emailInput);
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
        <Textfield
          style="width: 100%"
          input$style="color: white"
          label$style="color: white"
          value={emailInput}
          type="email"
          invalid={!isValidEmailInput && emailInput !== ""}
          on:input={handleInput}
        >
          <svelte:fragment slot="label">
            <div class="flex">
              <Icon
                className="pb-1 mr-0.5 flex content-center"
                color="white"
                src={TiMail}
                size="20"
              />
              Email
            </div>
          </svelte:fragment>
          <HelperText slot="helper" style="color: red; user-select: none">
            {#if !isValidEmailInput && emailInput !== ""}
              Please enter a valid email address.
            {/if}
          </HelperText>
        </Textfield>
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
