<script>
  import { LoadingBox } from '$components';
</script>

<div class="flex items-center justify-between">
  <div class="flex gap-4">
    <LoadingBox className="h-[100px] w-[100px]" />
    <div>
      <div class="flex h-9 items-end">
        <LoadingBox className="h-[90%] w-36" />
      </div>
      <div class="flex h-7 items-end">
        <LoadingBox className="h-[90%] w-20" />
      </div>
      <div class="flex h-7 items-end">
        <LoadingBox className="h-[90%] w-32" />
      </div>
    </div>
  </div>
  <LoadingBox className="h-5 w-5" />
</div>
