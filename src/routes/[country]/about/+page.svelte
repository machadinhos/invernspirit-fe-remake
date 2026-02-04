<script lang="ts">
  import { about } from '$content';
  import { Anchor } from '$components';
  import { imageLinks } from '$constants';
  import { page } from '$app/state';
</script>

<svelte:head><title>{about.headTitle}</title></svelte:head>

<section class="mx-auto mt-9 mb-4 w-[90%] max-w-350">
  <h1 class="text-center text-6xl">{about.title1}</h1>
  <h2 class="text-center text-4xl">{about.title2}</h2>
  <div class="my-4 h-px bg-white"></div>
  <div class="space-y-4">
    <div class="flex h-38 items-center overflow-clip">
      <img class="w-full" alt="ceramic banner" src={imageLinks.about.banner} />
    </div>
    <h3>{about.subtitle1}</h3>
    <p>{about.text1}</p>
    <p>{about.text2}</p>
    <div class="flex gap-4 max-lg:flex-col-reverse lg:gap-20">
      <div class="space-y-4 lg:w-3/5">
        <p>{about.text3}</p>
        <p>{about.text4}</p>
        <p>{about.text5}</p>
        <p>{about.text6}</p>
        <h3>{about.subtitle4}</h3>
        <p>{about.text7}</p>
        <p>{about.contactText} <Anchor href="/{page.params.country}/contact">{about.contactLink}</Anchor>.</p>
      </div>
      <div class="my-5 lg:my-0 lg:w-2/5">
        <img class="object-cover" alt="mafalda" src={imageLinks.about.mafalda} />
      </div>
    </div>
  </div>
</section>

<style>
  p {
    font-size: large;
    text-align: justify;
  }

  h3 {
    font-size: xx-large;
  }
</style>
