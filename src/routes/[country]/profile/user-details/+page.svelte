<script lang="ts">
  import { Button } from '$components';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { profile } from '$content';
  import { user as userState } from '$state';

  let { params } = $props();

  const onEditClick = (): void => {
    goto(`/${params.country}/profile/user-details/update`);
  };

  const onChangePasswordClick = (): void => {
    goto(`/${params.country}/profile/user-details/update-password`);
  };
</script>

{#snippet detailLine(label: string, value: string)}
  <tr>
    <td>
      {label}:
    </td>
    <td>
      {value}
    </td>
  </tr>
{/snippet}

{#if userState.value}
  <table class="border-separate border-spacing-x-2">
    {@render detailLine(profile.userDetails.email, userState.value.email)}
    {@render detailLine(profile.userDetails.firstName, userState.value.firstName)}
    {@render detailLine(profile.userDetails.lastName, userState.value.lastName)}
  </table>
  <div class="mt-4 flex gap-5">
    <Button class="px-4!" onclick={onEditClick} type="button">{profile.userDetails.edit}</Button>
    {#if userState.value.isValidated}
      <Button onclick={onChangePasswordClick}>{profile.userDetails.changePassword}</Button>
    {/if}
  </div>
{/if}
