<script lang="ts">
  import favicon from "$lib/assets/favicon.svg"

  let { children } = $props<{ children: () => unknown }>()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lato:wght@300;400;600;700&display=swap"
    rel="stylesheet"
  />
  <title>Catalog | C3SS</title>
</svelte:head>

<div class="app-shell">
  <header class="topbar">
    <div class="brand">
      <span class="logo-container"
        ><enhanced:img
          class="logo"
          src="$lib/assets/logo.png"
          alt="c3 logo"
        /></span
      >
      <div>
        <p class="eyebrow">College & Career Center</p>
        <p class="title">Scholarships & Summer Programs Catalog</p>
      </div>
    </div>
    <nav class="nav">
      <a class="nav-link" href="/scholarships">Scholarships</a>
      <a class="nav-link" href="/summerprograms">Summer Programs</a>
    </nav>
  </header>

  <main class="page">
    {@render children()}
  </main>
</div>

<style lang="scss">
  @use "$lib/styles/global.scss" as *;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    background: $bg;
    color: $text;
    font-family:
      "Inter",
      "Lato",
      system-ui,
      -apple-system,
      sans-serif;
  }

  .app-shell {
    max-width: 75vw;
    margin: 0 auto;
    padding: 32px 0px 64px;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid $nav-border;
    box-shadow: 0 18px 40px $nav-shadow;
    backdrop-filter: blur(12px);
    position: sticky;
    top: 18px;
    z-index: 10;

    width: 100%;
  }

  .brand {
    display: inline-flex;
    gap: 12px;
    align-items: center;
  }

  .logo-container {
    width: 48px;
    height: 48px;

    .logo {
      width: 48px;
      height: 48px;
    }
  }

  .title {
    font-weight: 800;
    margin: 0;
    color: $primary;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $eyebrow;
  }

  .nav {
    display: inline-flex;
    gap: 14px;
    align-items: center;
  }

  .nav-link {
    padding: 10px 14px;
    border-radius: 12px;
    text-decoration: none;
    color: $text;
    font-weight: 700;
    transition:
      background 120ms ease,
      color 120ms ease,
      transform 120ms ease,
      box-shadow 120ms ease;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    background: $link-focus;
    color: $primary;
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 10px 20px $link-shadow;
  }

  .page {
    margin-top: 28px;
    width: 100%;
  }

  @media (max-width: 720px) {
    .topbar {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .nav {
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
</style>
