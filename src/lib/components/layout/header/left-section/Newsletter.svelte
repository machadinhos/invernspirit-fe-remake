<script lang="ts">
  import { Button, DropdownMenu, DropdownMenuItem, TextInput } from '$components';
  import { common } from '$content';
  import { FaNewspaper } from 'svelte-icons-pack/fa';
  import HeaderIcon from '../HeaderIcon.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { TiMail } from 'svelte-icons-pack/ti';
  import { validateEmail } from '$lib/utils/input-validation';

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
    aria-label={common.header.leftSection.areaLabels.newsletter}
    onclick={handleIconClick}
    src={FaNewspaper}
    bind:ref={dropdownTriggerElement}
  />
  <DropdownMenu className="w-80" onClose={clearState} triggerElement={dropdownTriggerElement} bind:isOpen>
    <form class="m-5" onsubmit={subscribeToNewsletter}>
      <DropdownMenuItem>
        <h2>{common.header.leftSection.newsletterTitle}</h2>
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
              <div class="flex items-center gap-0.5">
                <Icon size="20" src={TiMail} />
                {common.header.leftSection.email}
              </div>
            {/snippet}
          </TextInput>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem classNames="w-full">
        <Button className="mt-2 w-full" type="submit">{common.header.leftSection.subscribe}</Button>
      </DropdownMenuItem>
    </form>
  </DropdownMenu>
</div>
