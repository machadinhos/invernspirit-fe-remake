<script lang="ts">
  import HeaderIcon from '$components/layout/header/HeaderIcon.svelte';
  import Button from '$components/ui/Button.svelte';
  import DropdownMenu from '$components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuItem from '$components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import TextInput from '$components/ui/text-input/TextInput.svelte';
  import { content } from '$content';
  import { validateEmail } from '$lib/utils/input-validation';
  import { Icon } from 'svelte-icons-pack';
  import { FaNewspaper } from 'svelte-icons-pack/fa';
  import { TiMail } from 'svelte-icons-pack/ti';

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
  <HeaderIcon
    aria-label={content.common.header.leftSection.areaLabels.newsletter}
    onclick={handleIconClick}
    src={FaNewspaper}
    bind:ref={dropdownTriggerElement}
  />
  <DropdownMenu className="w-80" onClose={clearState} triggerElement={dropdownTriggerElement} bind:isOpen>
    <form class="m-5" onsubmit={subscribeToNewsletter}>
      <DropdownMenuItem>
        <h2>{content.common.header.leftSection.newsletterTitle}</h2>
      </DropdownMenuItem>
      <DropdownMenuItem classNames="w-full">
        <div class="mt-2 w-full">
          <TextInput
            id="newsletter-email"
            name="email"
            autocomplete="email"
            invalid={!isValidEmailInput}
            invalidText="Please enter a valid email address."
            onblur={() => {
              isValidEmailInput = validateEmail(emailInput);
            }}
            type="email"
            bind:value={emailInput}
          >
            {#snippet label()}
              <div class="flex">
                <Icon className="mr-0.5 flex content-center pb-1" size="20" src={TiMail} />
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
