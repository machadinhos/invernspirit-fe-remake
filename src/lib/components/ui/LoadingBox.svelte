<script lang="ts">
  interface Props {
    className: HTMLDivElement['className'];
  }

  let { className }: Props = $props();
</script>

<div class="glint-effect {className}"></div>

<style>
  .glint-effect {
    aspect-ratio: 1;
    background: linear-gradient(to bottom right, #0000 calc(50% - 40px), #fff 50%, #0000 calc(50% + 40px)) bottom
      right/calc(200% + 80px) calc(200% + 80px) transparent;
    animation: l8 1s infinite;
  }
  @keyframes l8 {
    100% {
      background-position: top left;
    }
  }
</style>
