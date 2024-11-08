<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { TiMail } from 'svelte-icons-pack/ti';
  import Button from '$components/ui/Button.svelte';
  import { validateEmail } from '$lib/utils/input-validation';
  import { FaNewspaper } from 'svelte-icons-pack/fa';
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import DropdownMenu from '$components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuItem from '$components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import TextInput from '$components/ui/text-input/TextInput.svelte';
  import { content } from '$content';

  let isOpen = $state(false);
  let dropdownTriggerElement: HTMLButtonElement | undefined = $state();

  let emailInput: string = $state('');
  let isValidEmailInput = $state(true);

  function handleIconClick() {
    if (dropdownTriggerElement) {
      isOpen = !isOpen;
    }
  }

  function subscribeToNewsletter() {
    if (!validateEmail(emailInput)) {
      isValidEmailInput = false;
      return;
    }
    alert('todo');
    isOpen = false;
  }

  function clearState() {
    isOpen = false;
    isValidEmailInput = true;
    emailInput = '';
  }
</script>

<div>
  <HeaderIcon bind:ref={dropdownTriggerElement} src={FaNewspaper} onclick={handleIconClick} />
  <DropdownMenu onClose={clearState} className="w-80" bind:isOpen triggerElement={dropdownTriggerElement}>
    <form class="m-5" onsubmit={subscribeToNewsletter}>
      <DropdownMenuItem>
        <h2>{content.common.header.leftSection.newsletterTitle}</h2>
      </DropdownMenuItem>
      <DropdownMenuItem classNames="w-full">
        <div class="mt-2 w-full">
          <TextInput
            name="email"
            autocomplete="username"
            onblur={() => {
              isValidEmailInput = validateEmail(emailInput);
            }}
            bind:value={emailInput}
            type="email"
            invalid={!isValidEmailInput}
            invalidText="Please enter a valid email address."
          >
            {#snippet label()}
              <div class="flex">
                <Icon className="mr-0.5 flex content-center pb-1" src={TiMail} size="20" />
                {content.common.header.leftSection.email}
              </div>
            {/snippet}
          </TextInput>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem classNames="w-full">
        <Button className="mt-2 w-full" type="submit">{content.common.header.leftSection.subscribe}</Button>
      </DropdownMenuItem>
    </form>
  </DropdownMenu>
</div>
