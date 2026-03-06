<script lang="ts">
  import favicon from "$lib/assets/favicon.svg"

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
</svelte:head>

<header>
  <div class="header">
    <h1 class="info">
      C3 App
    </h1>
    <h3>
      List of scholarship and internship opportunities
    </h3>
  </div>
  <div class="explanation">
    <h2>
      Look for various opportunities to participate in scholars and interships!
    </h2>
  </div>
</header>
<div class="routes">
  <a class="route-link" href="/">Home</a>
  <a class="route-link" href="./scholarships">Scholarships</a>
  <a class="route-link" href="./internships">Internships</a>
</div>
<div class="content"></div>

{@render children()}

<style lang="scss">
  html {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
  }

  div.header {
    background-color: #FFF7E8;
  }

  div.explanation {
    background-image: linear-gradient(to right, #E02A0B, #E3AA30);
  }

  h1, h2, h3 {
    margin: 20px;
  }

  h1 {
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }

  h2 {
    font-family: "Inter", sans-serif;
    font-weight: 300;
  }

  h3 {
    font-family: "Inter", sans-serif;
    font-weight: 250;
  }
</style>
