<div style="background-image: url(/images/logo.webp)" class="pulsating-image h-44 w-44 bg-cover"></div>

<style>
  .pulsating-image {
    animation: pulsate 1.5s infinite;
  }

  @keyframes pulsate {
    0% {
      opacity: 0;
      transform: scale(1.2);
    }
    0.1% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
</style>
