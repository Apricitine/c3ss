<script lang="ts">
  import { FILTER_COLORS, type SummerFilter, type SummerFilterKey } from "$lib/scripts/summerPrograms"

  interface Props {
    filters: SummerFilter[]
    selectedFilters: SummerFilterKey[]
    resultCount: number
    totalCount: number
    onFilterToggle: (filter: SummerFilterKey) => void
    onReset: () => void
  }

  let {
    filters,
    selectedFilters,
    resultCount,
    totalCount,
    onFilterToggle,
    onReset,
  }: Props = $props()
</script>

<section class="filter-panel" id="summerprogram-filters" aria-label="Summer program filters">
  <div class="panel-header">
    <div>
      <p class="eyebrow">Filters</p>
      <p class="result-count">{resultCount} of {totalCount} summer programs</p>
    </div>
    <button type="button" class="reset-button" onclick={onReset}>Reset</button>
  </div>

  <div class="filter-section">
    <p class="section-title">Categories</p>
    {#if filters.length}
      <div class="filter-options">
        {#each filters as filter (filter.key)}
          <button
            type="button"
            class="filter-chip"
            class:selected={selectedFilters.includes(filter.key)}
            style={`--filter-color: ${FILTER_COLORS[filter.color]}`}
            aria-pressed={selectedFilters.includes(filter.key)}
            title={filter.description}
            onclick={() => onFilterToggle(filter.key)}
          >
            <span class="color-dot" aria-hidden="true"></span>
            {filter.name}
          </button>
        {/each}
      </div>
    {:else}
      <p class="empty-filter-note">No category filters are available yet.</p>
    {/if}
  </div>
</section>

<style lang="scss">
  @use "$lib/styles/global.scss" as *;
  .filter-panel {
    display: grid;
    gap: 18px;
    margin: -4px 0 20px;
    padding: 18px;
    border: 1px solid $nav-border;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 16px 34px $nav-shadow;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .eyebrow,
  .section-title,
  .result-count {
    margin: 0;
  }

  .eyebrow {
    color: $text;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .result-count {
    margin-top: 3px;
    color: $eyebrow;
    font-weight: 700;
  }

  .reset-button {
    border: 1px solid $nav-border;
    border-radius: 10px;
    background: $link-focus;
    color: $primary;
    cursor: pointer;
    font: 800 0.86rem/1 "Inter", system-ui, -apple-system, sans-serif;
    padding: 9px 12px;
    transition: background 130ms ease, border-color 130ms ease, transform 130ms ease;
  }

  .reset-button:hover,
  .reset-button:focus-visible {
    background: darken($link-focus, 5);
    border-color: darken($nav-border, 5);;
    outline: none;
    transform: translateY(-1px);
  }

  .filter-section {
    display: grid;
    gap: 10px;
  }

  .section-title {
    color: $text;
    font-size: 0.92rem;
    font-weight: 800;
  }


  
  .empty-filter-note {
    margin: 0;
    color: $eyebrow;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-chip {
    --filter-color: var(--accent);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 34px;
    padding: 7px 11px;
    border: 1px solid color-mix(in srgb, var(--filter-color) 56%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--filter-color) 16%, white);
    color: #0b1d36;
    cursor: pointer;
    font: 800 0.84rem/1 "Inter", system-ui, -apple-system, sans-serif;
    transition: background 130ms ease, border-color 130ms ease, box-shadow 130ms ease, transform 130ms ease;
  }

  .filter-chip:hover,
  .filter-chip:focus-visible {
    border-color: color-mix(in srgb, var(--filter-color) 75%, #0b1d36);
    box-shadow: 0 10px 20px color-mix(in srgb, var(--filter-color) 25%, transparent);
    outline: none;
    transform: translateY(-1px);
  }

  .filter-chip.selected {
    background: color-mix(in srgb, var(--filter-color) 70%, white);
    border-color: color-mix(in srgb, var(--filter-color) 82%, #0b1d36);
    box-shadow: inset 0 0 0 1px rgba(11, 29, 54, 0.12);
  }

  .color-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--filter-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--filter-color) 22%, transparent);
  }

  @media (max-width: 640px) {
    .filter-panel {
      padding: 15px;
      border-radius: 14px;
    }

    .panel-header {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
