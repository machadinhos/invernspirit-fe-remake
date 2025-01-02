<script>
  import { PulsatingLogo } from '$components';
</script>

<div class="loading-screen">
  <PulsatingLogo />
</div>

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
</style>
