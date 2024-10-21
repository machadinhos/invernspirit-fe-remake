<script lang="ts">
  import MediaButton from '$lib/components/header/MediaButton.svelte';
  import {
    FaNewspaper,
    FaBrandsInstagram,
    FaBrandsYoutube,
    FaBrandsPinterestP
  } from 'svelte-icons-pack/fa';
  import { socialMediaLinks } from '$lib/utils/links';
  import { Icon } from 'svelte-icons-pack';
  import MenuSurface from '@smui/menu-surface';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { TiMail } from 'svelte-icons-pack/ti';

  let surface: MenuSurface;
  let valueA = '';
</script>

<div class="mx-10 flex w-fit gap-4">
  <div>
    <button
      on:click={() => surface.setOpen(true)}
      class="cursor-pointer transition-transform duration-300 ease-out hover:scale-150"
    >
      <Icon color="white" src={FaNewspaper} size="20" />
    </button>
    <MenuSurface
      class="w-80 bg-[#4C4B48] text-white"
      bind:this={surface}
      anchorCorner="BOTTOM_LEFT"
    >
      <form class="m-5">
        <h2>Subscribe to our newsletter</h2>
        <Textfield
          style="width: 100%"
          input$style="color: white;"
          label$style="color: white;"
          helperLine$style="color: white;"
          bind:value={valueA}
          type="email"
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
          <HelperText style="color: white; user-select: none" slot="helper"
            >Ex: example@gmail.com</HelperText
          >
        </Textfield>
        <button class="mt-2" type="submit">Subscribe</button>
      </form>
    </MenuSurface>
  </div>
  <div class="h-5 w-0.5 bg-white" />
  <MediaButton src={FaBrandsInstagram} href={socialMediaLinks.instagram} />
  <MediaButton src={FaBrandsPinterestP} href={socialMediaLinks.pinterestP} />
  <MediaButton src={FaBrandsYoutube} href={socialMediaLinks.youtube} />
</div>
