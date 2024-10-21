<script lang="ts">
  export let etiquette: string;
</script>

<li class="underline-animation cursor-pointer">
  <div class="text-white">{etiquette}</div>
</li>

<style>
  .underline-animation {
    position: relative;
  }
  .underline-animation::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }
  .underline-animation:hover::after {
    width: 100%;
  }
</style>
