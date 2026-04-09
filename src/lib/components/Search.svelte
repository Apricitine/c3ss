<script lang="ts">
  export let searchTerm: string
</script>

<div class="search-shell">
  <label class="search-bar">
    <span class="icon" aria-hidden="true">🔍</span>
    <input
      type="search"
      class="search-field"
      placeholder="Search scholarships…"
      autocomplete="off"
      bind:value={searchTerm}
      on:input
    />
    <span class="glow" aria-hidden="true"></span>
  </label>
</div>

<style lang="scss">
  .search-shell {
    display: flex;
    justify-content: center;
    margin: 0 0 18px;
    padding: 6px 10px;
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: min(720px, 100%);
    padding: 12px 14px 12px 18px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(29, 78, 216, 0.08));
    box-shadow:
      0 14px 32px rgba(15, 60, 164, 0.15),
      0 2px 6px rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(56, 189, 248, 0.3);
    overflow: hidden;
  }

  .icon {
    font-size: 1.05rem;
    color: #0f3ca4;
  }

  .search-field {
    flex: 1;
    font: 600 1rem/1.2 "Inter", system-ui, -apple-system, sans-serif;
    background: transparent;
    border: none;
    color: #0b1f3b;
    outline: none;
  }

  .search-field::placeholder {
    color: rgba(11, 31, 59, 0.6);
    letter-spacing: 0.01em;
  }

  .search-bar:focus-within {
    border-color: rgba(29, 78, 216, 0.55);
    box-shadow:
      0 16px 34px rgba(29, 78, 216, 0.18),
      0 0 0 2px rgba(56, 189, 248, 0.3);
  }

  .glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 18% 50%, rgba(56, 189, 248, 0.18), transparent 32%),
      radial-gradient(circle at 85% 30%, rgba(29, 78, 216, 0.16), transparent 38%);
    opacity: 0.9;
  }

  @media (max-width: 640px) {
    .search-bar {
      padding: 12px 12px 12px 14px;
      border-radius: 14px;
    }

    .search-field {
      font-size: 0.95rem;
    }
  }
</style>
