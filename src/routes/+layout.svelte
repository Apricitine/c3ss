<script lang="ts">
  import favicon from "$lib/assets/favicon.svg"

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="header">
  <div class="content">
    <h1 class="info">
      C3 App / List of summer programs & volunteering opportunities
    </h1>
    <div class="routes">
	  <a class="route-link" href="/">Home</a>
      <a class="route-link" href="./scholarships">Scholarships</a>
      <a class="route-link" href="./internships">Internships</a>
    </div>
  </div>
</div>

{@render children()}

<style lang="scss">
</style>
