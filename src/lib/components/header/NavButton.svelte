<script lang="ts">
  export let etiquette: string;
  export let isDropdown: boolean;
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
</script>

<li>
  <div
    class="underline-animation flex cursor-pointer items-center"
    on:click={() => toggleDropdown()}
    role="button"
    aria-expanded={isDropdownOpen}
    aria-controls="dropdown-menu"
    tabindex="0"
    on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    }}
  >
    <div class="text-white">{etiquette}</div>
    {#if isDropdown}
      <svg
        class="ms-2 h-2.5 w-2.5 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="m1 1 4 4 4-4"
        />
      </svg>
    {/if}
  </div>

  {#if isDropdownOpen}
    <div>
      <slot />
    </div>
  {/if}
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
