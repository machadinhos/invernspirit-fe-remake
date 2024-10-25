<script>
  import HeaderIcon from "$lib/components/layout/header/HeaderIcon.svelte";
  import { BiSolidCart } from "svelte-icons-pack/bi";
  import { FaSolidUser } from "svelte-icons-pack/fa";
</script>

<div class="flex items-center justify-end gap-4">
  <select class="h-fit bg-background text-white">
    <option>pt</option>
    <option>es</option>
  </select>
  <a href="/" class="h-fit w-fit">
    <HeaderIcon src={FaSolidUser} />
  </a>
  <a href="/" class="h-fit w-fit">
    <HeaderIcon src={BiSolidCart} />
  </a>
</div>
