<script lang="ts">
  import { FILTER_COLORS, type ScholarshipFilter, type ScholarshipFilterKey } from "$lib/scripts/scholarships"

  interface Props {
    filters: ScholarshipFilter[]
    selectedFilters: ScholarshipFilterKey[]
    minAward: number
    maxAward: number
    rangeMin: number
    rangeMax: number
    resultCount: number
    totalCount: number
    onFilterToggle: (filter: ScholarshipFilterKey) => void
    onMinAwardChange: (value: number) => void
    onMaxAwardChange: (value: number) => void
    onReset: () => void
  }

  let {
    filters,
    selectedFilters,
    minAward,
    maxAward,
    rangeMin,
    rangeMax,
    resultCount,
    totalCount,
    onFilterToggle,
    onMinAwardChange,
    onMaxAwardChange,
    onReset,
  }: Props = $props()

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })

  let rangeSpan = $derived(Math.max(rangeMax - rangeMin, 1))
  let lowerPercent = $derived(((minAward - rangeMin) / rangeSpan) * 100)
  let upperPercent = $derived(((maxAward - rangeMin) / rangeSpan) * 100)
  let awardStep = $derived(Math.max(100, Math.round(rangeSpan / 10000) * 100))
  let canUseAwardRange = $derived(rangeMax > rangeMin)
</script>

<section class="filter-panel" id="scholarship-filters" aria-label="Scholarship filters">
  <div class="panel-header">
    <div>
      <p class="eyebrow">Filters</p>
      <p class="result-count">{resultCount} of {totalCount} scholarships</p>
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

  <div class="filter-section">
    <div class="section-row">
      <p class="section-title">Award Range</p>
      <p class="price-label">{formatCurrency(minAward)} to {formatCurrency(maxAward)}</p>
    </div>

    <div
      class="range-track"
      style={`--range-start: ${lowerPercent}%; --range-end: ${upperPercent}%`}
    >
      <input
        class="range-input min-input"
        style={`z-index: ${minAward >= maxAward && minAward > rangeMin ? 4 : 2}`}
        type="range"
        min={rangeMin}
        max={rangeMax}
        step={awardStep}
        value={minAward}
        disabled={!canUseAwardRange}
        aria-label="Minimum award amount"
        aria-valuetext={formatCurrency(minAward)}
        oninput={(event) => onMinAwardChange(Number(event.currentTarget.value))}
      />
      <input
        class="range-input max-input"
        type="range"
        min={rangeMin}
        max={rangeMax}
        step={awardStep}
        value={maxAward}
        disabled={!canUseAwardRange}
        aria-label="Maximum award amount"
        aria-valuetext={formatCurrency(maxAward)}
        oninput={(event) => onMaxAwardChange(Number(event.currentTarget.value))}
      />
    </div>

    <div class="range-captions" aria-hidden="true">
      <span>{formatCurrency(rangeMin)}</span>
      <span>{formatCurrency(rangeMax)}</span>
    </div>
  </div>
</section>

<style lang="scss">
  .filter-panel {
    display: grid;
    gap: 18px;
    margin: -4px 0 20px;
    padding: 18px;
    border: 1px solid rgba(29, 78, 216, 0.16);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 16px 34px rgba(23, 61, 140, 0.1);
  }

  .panel-header,
  .section-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .eyebrow,
  .section-title,
  .result-count,
  .price-label {
    margin: 0;
  }

  .eyebrow {
    color: var(--primary-dark);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .result-count {
    margin-top: 3px;
    color: var(--muted);
    font-weight: 700;
  }

  .reset-button {
    border: 1px solid rgba(29, 78, 216, 0.18);
    border-radius: 10px;
    background: rgba(56, 189, 248, 0.12);
    color: var(--primary-dark);
    cursor: pointer;
    font: 800 0.86rem/1 "Inter", system-ui, -apple-system, sans-serif;
    padding: 9px 12px;
    transition: background 130ms ease, border-color 130ms ease, transform 130ms ease;
  }

  .reset-button:hover,
  .reset-button:focus-visible {
    background: rgba(56, 189, 248, 0.22);
    border-color: rgba(29, 78, 216, 0.32);
    outline: none;
    transform: translateY(-1px);
  }

  .filter-section {
    display: grid;
    gap: 10px;
  }

  .section-title {
    color: var(--text);
    font-size: 0.92rem;
    font-weight: 800;
  }

  .price-label {
    color: var(--primary-dark);
    font-size: 0.9rem;
    font-weight: 800;
  }

  
  .empty-filter-note {
    margin: 0;
    color: var(--muted);
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

  .range-track {
    position: relative;
    height: 32px;
    margin-top: 2px;
  }

  .range-track::before,
  .range-track::after {
    content: "";
    position: absolute;
    top: 13px;
    height: 6px;
    border-radius: 999px;
  }

  .range-track::before {
    inset-inline: 0;
    background: rgba(29, 78, 216, 0.14);
  }

  .range-track::after {
    left: var(--range-start);
    right: calc(100% - var(--range-end));
    background: linear-gradient(90deg, var(--accent), var(--primary));
  }

  .range-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 32px;
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    pointer-events: none;
  }

  .min-input {
    z-index: 2;
  }

  .max-input {
    z-index: 3;
  }

  .range-input::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    -webkit-appearance: none;
    appearance: none;
    background: var(--primary);
    box-shadow: 0 6px 14px rgba(23, 61, 140, 0.24);
    cursor: pointer;
    pointer-events: auto;
  }

  .range-input::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 6px 14px rgba(23, 61, 140, 0.24);
    cursor: pointer;
    pointer-events: auto;
  }

  .range-input::-webkit-slider-runnable-track {
    background: transparent;
    border: none;
  }

  .range-input::-moz-range-track {
    background: transparent;
    border: none;
  }

  .range-input:disabled::-webkit-slider-thumb {
    cursor: default;
    opacity: 0.45;
  }

  .range-input:disabled::-moz-range-thumb {
    cursor: default;
    opacity: 0.45;
  }

  .range-captions {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    color: var(--muted);
    font-size: 0.78rem;
    font-weight: 800;
  }

  @media (max-width: 640px) {
    .filter-panel {
      padding: 15px;
      border-radius: 14px;
    }

    .panel-header,
    .section-row {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
