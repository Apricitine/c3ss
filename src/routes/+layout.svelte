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
</svelte:head>

<div class="app-shell">
  <header class="topbar">
    <div class="brand">
      <span class="dot"></span>
      <div>
        <p class="eyebrow">College & Career Center</p>
        <p class="title">C3 Opportunities</p>
      </div>
    </div>
    <nav class="nav">
      <a class="nav-link" href="/">Home</a>
      <a class="nav-link" href="/scholarships">Scholarships</a>
      <a class="nav-link" href="/internships">Internships</a>
    </nav>
  </header>

  <main class="page">
    {@render children()}
  </main>
</div>

<style lang="scss">
  :global(:root) {
    --bg: #eaf2ff;
    --bg-strong: #dbe8ff;
    --surface: #f7faff;
    --primary: #1d4ed8;
    --primary-dark: #0f3ca4;
    --accent: #38bdf8;
    --text: #0b1d36;
    --muted: #4b628a;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    background: radial-gradient(110% 60% at 50% -10%, #e4edff 0%, #eef3ff 45%, #ffffff 100%);
    color: var(--text);
    font-family: "Inter", "Lato", system-ui, -apple-system, sans-serif;
  }

  .app-shell {
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 20px 64px;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(29, 78, 216, 0.18);
    box-shadow: 0 18px 40px rgba(23, 61, 140, 0.12);
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

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--primary));
    box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.22);
  }

  .title {
    font-weight: 800;
    margin: 0;
    color: var(--primary-dark);
  }

  .eyebrow {
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(11, 29, 54, 0.6);
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
    color: var(--text);
    font-weight: 700;
    transition: background 120ms ease, color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    background: rgba(56, 189, 248, 0.18);
    color: var(--primary);
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.16);
  }

  .page {
    margin-top: 28px;
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
</style>
