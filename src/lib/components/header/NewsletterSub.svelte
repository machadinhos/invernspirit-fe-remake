<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { TiMail } from 'svelte-icons-pack/ti';
  import Button from '$lib/components/generic/Button.svelte';
  import MenuSurface from '@smui/menu-surface';
  import { validateEmail } from '$lib/utils/general';
  import { FaNewspaper } from 'svelte-icons-pack/fa';
  import HeaderIcon from '$lib/components/header/HeaderIcon.svelte';

  let surface: MenuSurface;
  let isValidEmailInput = true;
  let emailInput = '';

  function handleIconClick() {
    surface.setOpen(true);
  }

  function handleInput() {
    isValidEmailInput = validateEmail(emailInput);
  }

  function subscribeToNewsletter() {
    alert('todo');
  }
</script>

<div>
  <HeaderIcon src={FaNewspaper} on:click={handleIconClick} />
  <MenuSurface class="w-80 bg-background text-white" bind:this={surface} anchorCorner="BOTTOM_LEFT">
    <form class="m-5">
      <h2>Subscribe to our newsletter</h2>
      <Textfield
        style="width: 100%"
        input$style="color: white;"
        label$style="color: white;"
        bind:value={emailInput}
        type="email"
        invalid={!isValidEmailInput && emailInput !== ''}
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
        <HelperText style="color: red; user-select: none" slot="helper">
          {#if !isValidEmailInput && emailInput !== ''}
            Please enter a valid email address.
          {/if}
        </HelperText>
      </Textfield>
      <Button className="mt-2 w-full" type="submit" on:click={subscribeToNewsletter}
        >Subscribe</Button
      >
    </form>
  </MenuSurface>
</div>
