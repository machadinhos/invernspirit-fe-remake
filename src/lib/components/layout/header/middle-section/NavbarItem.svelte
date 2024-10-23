<li class="my-0 w-fit py-0">
  <div class="list-item-class inline">
    <slot />
  </div>
  <div class="underline-class h-0.5 w-0 bg-white" />
</li>

<style>
  .underline-class {
    transition: width 300ms ease-in-out;
  }

  .list-item-class:hover ~ .underline-class {
    width: 100%;
  }
</style>
