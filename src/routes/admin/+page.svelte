<script>
  import { enhance } from '$app/forms';
  let { form } = $props();
  let loggedIn = $derived(form?.success ?? false);

</script>


{#if !loggedIn}
  <form method="POST" use:enhance> 
    <input name="password" type="password"/>
    <button type="submit">Login</button>
  </form>
{/if}


{#if loggedIn}
  <p> Login successful! </p>
{:else if !loggedIn}
  <p> {form?.error} </p>
{/if}

