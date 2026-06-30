<script lang="ts">
  import Modal from "$lib/components/Modal.svelte"
  import ScholarshipCard from "$lib/components/Scholarship.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import { fuzzy } from "fast-fuzzy"
  import { slide } from "svelte/transition"
  import {
    Scholarship,
    type ScholarshipDTO,
    type ScholarshipFilter,
    type ScholarshipFilterKey,
  } from "$lib/scripts/scholarships"
  import Search from "$lib/components/Search.svelte"
  import FilterSelect from "$lib/components/FilterSelect.svelte"

  let { data }: { data: { scholarships: ScholarshipDTO[] } } = $props()

  let showModal = $state(false)
  let filtersOpen = $state(false)
  let activeScholarship = $state<Scholarship | null>(null)
  let activeCardRect = $state<DOMRect | null>(null)
  let searchTerm = $state("")
  let selectedFilters = $state<ScholarshipFilterKey[]>([])
  let selectedMinAward = $state(0)
  let selectedMaxAward = $state(0)
  let awardRangeInitialized = $state(false)
  let scholarships = $derived((data.scholarships ?? []).map(Scholarship.from))

  let filterOptions = $derived.by(() => {
    const options = new Map<ScholarshipFilterKey, ScholarshipFilter>()

    for (const scholarship of scholarships) {
      for (const filter of scholarship.displayFilters()) {
        options.set(filter.key, filter)
      }
    }

    return [...options.values()].sort((first, second) => first.name.localeCompare(second.name))
  })

  const getFiniteAwardValues = (scholarship: Scholarship) =>
    scholarship.endowment.flatMap((prize) => {
      const [min, max] = Array.isArray(prize.amount)
        ? prize.amount
        : [prize.amount, prize.amount]

      return max === "full-tuition" ? [min] : [min, max]
    })

  const getAwardRange = (scholarship: Scholarship) => {
    let lowest = Number.POSITIVE_INFINITY
    let highest = Number.NEGATIVE_INFINITY

    for (const prize of scholarship.endowment) {
      const [min, max] = Array.isArray(prize.amount)
        ? prize.amount
        : [prize.amount, prize.amount]

      lowest = Math.min(lowest, min)
      highest = max === "full-tuition" ? Number.POSITIVE_INFINITY : Math.max(highest, max)
    }

    if (!Number.isFinite(lowest) || highest === Number.NEGATIVE_INFINITY) return null

    return { min: lowest, max: highest }
  }

  let awardBounds = $derived.by(() => {
    const values = scholarships.flatMap(getFiniteAwardValues)

    if (!values.length) return { min: 0, max: 0 }

    return {
      min: Math.max(0, Math.floor(Math.min(...values) / 100) * 100),
      max: Math.ceil(Math.max(...values) / 100) * 100,
    }
  })

  let isAwardRangeFiltered = $derived(
    awardBounds.max > awardBounds.min &&
      (selectedMinAward > awardBounds.min || selectedMaxAward < awardBounds.max)
  )

  let activeFilterCount = $derived(selectedFilters.length + (isAwardRangeFiltered ? 1 : 0))

  const openScholarship = (scholarship: Scholarship, event: MouseEvent) => {
    const sourceCard = event.currentTarget instanceof HTMLElement ? event.currentTarget : null

    activeScholarship = scholarship
    activeCardRect = sourceCard?.getBoundingClientRect() ?? null
    showModal = true
  }

  const sortScholarships = (term: string, source: Scholarship[]): Scholarship[] => {
    const query = term.trim()

    if (!query) return [...source]

    return [...source]
      .map((scholarship) => ({
        scholarship,
        similarity: fuzzy(query, scholarship.name),
      }))
      .sort((firstItem, secondItem) => secondItem.similarity - firstItem.similarity)
      .map(({ scholarship }) => scholarship)
  }

  const toggleFilter = (filter: ScholarshipFilterKey) => {
    selectedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((selectedFilter) => selectedFilter !== filter)
      : [...selectedFilters, filter]
  }

  const setMinAward = (value: number) => {
    selectedMinAward = Math.min(Math.max(value, awardBounds.min), selectedMaxAward)
  }

  const setMaxAward = (value: number) => {
    selectedMaxAward = Math.max(Math.min(value, awardBounds.max), selectedMinAward)
  }

  const resetFilters = () => {
    selectedFilters = []
    selectedMinAward = awardBounds.min
    selectedMaxAward = awardBounds.max
  }

  const formatGradeList = (grades: number[]) => grades.map((grade) => `Grade ${grade}`).join(", ")

  const matchesFilters = (scholarship: Scholarship) => {
    const hasSelectedFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((selectedFilter) => scholarship.filters.includes(selectedFilter))

    if (!hasSelectedFilters) return false
    if (!isAwardRangeFiltered) return true

    const awardRange = getAwardRange(scholarship)

    return awardRange !== null && awardRange.max >= selectedMinAward && awardRange.min <= selectedMaxAward
  }

  let renderedScholarships = $derived.by(() =>
    sortScholarships(searchTerm, scholarships.filter(matchesFilters))
  )

  $effect(() => {
    if (awardRangeInitialized) return

    selectedMinAward = awardBounds.min
    selectedMaxAward = awardBounds.max
    awardRangeInitialized = true
  })

  $effect(() => {
    if (!showModal) {
      activeCardRect = null
    }
  })
</script>

<div class="search-tools">
  <Search bind:searchTerm />
  <button
    type="button"
    class="filter-tab"
    class:is-active={filtersOpen}
    aria-expanded={filtersOpen}
    aria-controls="scholarship-filters"
    onclick={() => (filtersOpen = !filtersOpen)}
  >
    <span class="filter-icon" aria-hidden="true"></span>
    <span>Filters</span>
    {#if activeFilterCount}
      <span class="filter-count">{activeFilterCount}</span>
    {/if}
  </button>
</div>

{#if filtersOpen}
  <div class="filter-transition" transition:slide={{ duration: 180, axis: "y" }}>
    <FilterSelect
      filters={filterOptions}
      selectedFilters={selectedFilters}
      minAward={selectedMinAward}
      maxAward={selectedMaxAward}
      rangeMin={awardBounds.min}
      rangeMax={awardBounds.max}
      resultCount={renderedScholarships.length}
      totalCount={scholarships.length}
      onFilterToggle={toggleFilter}
      onMinAwardChange={setMinAward}
      onMaxAwardChange={setMaxAward}
      onReset={resetFilters}
    />
  </div>
{/if}

{#if renderedScholarships.length}
  <section class="scholarship-grid">
    {#each renderedScholarships as scholarship (scholarship.id)}
      <div
        class="scholarship-card-slot"
        class:source-hidden={showModal && activeScholarship?.id === scholarship.id}
        aria-hidden={showModal && activeScholarship?.id === scholarship.id}
      >
        <ScholarshipCard
          onclick={(event) => openScholarship(scholarship, event)}
          name={scholarship.name}
          deadline={scholarship.formattedDeadline()}
          daysLeft={scholarship.daysUntil()}
          description={scholarship.description}
          endowmentRange={scholarship.endowmentRange()}
          filters={scholarship.displayFilters()}
        />
      </div>
    {/each}
  </section>
{:else}
  <div class="empty-state">
    <p>No scholarships match this search.</p>
    <button type="button" onclick={resetFilters}>Reset filters</button>
  </div>
{/if}

<Modal bind:showModal sourceRect={activeCardRect}>
  {#if activeScholarship}
    <article class="scholarship-modal">
      <header class="modal-header">
        <div class="meta">
          <p class="eyebrow">Scholarship</p>
          <h2>{activeScholarship.name}</h2>
        </div>

        <div class={`status-card ${activeScholarship.countdownClass()}`}>
          <span>{activeScholarship.countdownLabel()}</span>
          <strong>{activeScholarship.formattedDeadline()}</strong>
        </div>
      </header>

      <section class="detail-grid" aria-label="Scholarship details">
        {#if activeScholarship.endowmentRange()}
          <div class="detail-tile">
            <span>Award</span>
            <strong>{activeScholarship.endowmentRange()}</strong>
          </div>
        {/if}

        <div class="detail-tile">
          <span>Deadline</span>
          <strong>{activeScholarship.formattedDeadline()}</strong>
        </div>

        <div class="detail-tile">
          <span>Status</span>
          <strong class={`countdown ${activeScholarship.countdownClass()}`}>
            {activeScholarship.countdownLabel()}
          </strong>
        </div>

        {#if activeScholarship.availableGrades?.length}
          <div class="detail-tile">
            <span>Eligible grades</span>
            <strong>{formatGradeList(activeScholarship.availableGrades)}</strong>
          </div>
        {/if}
      </section>

      <div class="modal-content-grid">
        <section class="modal-section overview-section">
          <p class="section-label">Overview</p>
          <p class="modal-description">{activeScholarship.description}</p>
        </section>

        <aside class="modal-section sidebar-section">
          {#if activeScholarship.primary_link}
            <a
              class="primary-link"
              href={activeScholarship.primary_link}
              target="_blank"
              rel="noreferrer"
            >
              View full details
            </a>
          {/if}

          {#if activeScholarship.displayFilters().length}
            <div class="tag-section">
              <p class="section-label">Categories</p>
              <div class="tags">
                {#each activeScholarship.displayFilters() as filter (filter.key)}
                  <Tag color={filter.color} name={filter.name} description={filter.description} />
                {/each}
              </div>
            </div>
          {/if}
        </aside>
      </div>
    </article>
  {/if}
</Modal>

<style lang="scss">
  .search-tools {
    display: flex;
    align-items: stretch;
    gap: 10px;
    margin: 0 0 18px;
  }

  .search-tools :global(.search-shell) {
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    padding: 0;
  }

  .search-tools :global(.search-bar) {
    width: 100%;
    min-height: 52px;
  }

  .filter-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-width: 124px;
    min-height: 52px;
    padding: 12px 15px;
    border: 1px solid rgba(29, 78, 216, 0.22);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.86);
    color: var(--primary-dark);
    cursor: pointer;
    font: 800 0.94rem/1 "Inter", system-ui, -apple-system, sans-serif;
    box-shadow: 0 12px 26px rgba(23, 61, 140, 0.1);
    transition: background 140ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
  }

  .filter-tab:hover,
  .filter-tab:focus-visible,
  .filter-tab.is-active {
    background: rgba(56, 189, 248, 0.18);
    border-color: rgba(29, 78, 216, 0.42);
    box-shadow: 0 15px 30px rgba(37, 99, 235, 0.14);
    outline: none;
    transform: translateY(-1px);
  }

  .filter-icon {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 14px;
    transition: transform 140ms ease;
  }

  .filter-icon::before,
  .filter-icon::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    box-shadow: 0 6px 0 currentColor;
    transition: transform 140ms ease, width 140ms ease;
  }

  .filter-icon::before {
    top: 0;
  }

  .filter-icon::after {
    bottom: 0;
    width: 12px;
  }

  .filter-tab.is-active .filter-icon {
    transform: translateY(1px);
  }

  .filter-tab.is-active .filter-icon::after {
    width: 18px;
    transform: translateX(3px);
  }

  .filter-count {
    display: inline-grid;
    place-items: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 999px;
    background: var(--primary);
    color: #ffffff;
    font-size: 0.78rem;
  }

  .filter-transition {
    overflow: hidden;
  }

  .scholarship-grid {
    display: grid;
    gap: 14px;
    margin: 18px 0 32px;
  }

  .scholarship-card-slot {
    transition: opacity 160ms ease;
  }

  .scholarship-card-slot.source-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .empty-state {
    display: grid;
    place-items: center;
    gap: 12px;
    min-height: 220px;
    margin: 18px 0 32px;
    padding: 30px;
    border: 1px dashed rgba(29, 78, 216, 0.28);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.72);
    color: var(--muted);
    text-align: center;
  }

  .empty-state p {
    margin: 0;
    font-weight: 800;
  }

  .empty-state button {
    border: 1px solid rgba(29, 78, 216, 0.2);
    border-radius: 10px;
    background: rgba(56, 189, 248, 0.16);
    color: var(--primary-dark);
    cursor: pointer;
    font: 800 0.9rem/1 "Inter", system-ui, -apple-system, sans-serif;
    padding: 10px 12px;
  }

  .scholarship-modal {
    display: grid;
    gap: 18px;
  }

  .modal-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 18px;
    align-items: start;
    padding: 0 44px 18px 0;
    border-bottom: 1px solid rgba(29, 78, 216, 0.12);
  }

  .meta {
    display: grid;
    gap: 6px;
    min-width: 0;
  }

  .meta h2 {
    margin: 0;
    color: #0b1d36;
    font-size: clamp(1.35rem, 2.5vw, 1.9rem);
    line-height: 1.18;
  }

  .eyebrow,
  .section-label {
    margin: 0;
    color: rgba(15, 60, 164, 0.82);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .status-card {
    display: grid;
    justify-items: end;
    gap: 4px;
    min-width: 132px;
    padding: 12px 14px;
    border: 1px solid rgba(29, 78, 216, 0.16);
    border-radius: 14px;
    background: rgba(56, 189, 248, 0.13);
    color: #0b2f66;
    text-align: right;
  }

  .status-card span {
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .status-card strong {
    color: #1d4ed8;
    font-size: 1rem;
  }

  .status-card.calm {
    background: rgba(104, 181, 123, 0.14);
    border-color: rgba(104, 181, 123, 0.34);
  }

  .status-card.warm {
    background: rgba(246, 195, 68, 0.2);
    border-color: rgba(246, 195, 68, 0.42);
  }

  .status-card.hot {
    background: rgba(179, 38, 30, 0.12);
    border-color: rgba(179, 38, 30, 0.26);
  }

  .status-card.passed {
    background: rgba(90, 112, 144, 0.12);
    border-color: rgba(90, 112, 144, 0.26);
    color: #4f5f7d;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  .detail-tile {
    display: grid;
    align-content: start;
    gap: 7px;
    min-height: 82px;
    padding: 12px;
    border: 1px solid rgba(29, 78, 216, 0.12);
    border-radius: 14px;
    background: rgba(247, 250, 255, 0.86);
  }

  .detail-tile span {
    color: var(--muted);
    font-size: 0.73rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .detail-tile strong {
    color: #0b1d36;
    font-size: 0.95rem;
    line-height: 1.28;
  }

  .modal-content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(190px, 0.38fr);
    gap: 14px;
    align-items: start;
  }

  .modal-section {
    display: grid;
    gap: 10px;
    padding: 16px;
    border: 1px solid rgba(29, 78, 216, 0.12);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.72);
  }

  .overview-section {
    min-height: 170px;
  }

  .sidebar-section {
    gap: 14px;
  }

  .tag-section {
    display: grid;
    gap: 10px;
  }

  .countdown {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    background: rgba(56, 189, 248, 0.2);
    color: #0b2f66;
  }

  .countdown.calm {
    background: rgba(104, 181, 123, 0.18);
    color: #2b4c35;
    box-shadow: inset 0 0 0 1px rgba(104, 181, 123, 0.4);
  }

  .countdown.warm {
    background: rgba(246, 195, 68, 0.28);
    color: #7a2a1f;
    box-shadow: inset 0 0 0 1px rgba(246, 195, 68, 0.5);
    animation: pulse 1s ease-in-out infinite;
  }

  .countdown.hot {
    background: rgba(179, 38, 30, 0.22);
    color: #b3261e;
    box-shadow:
      inset 0 0 0 1px rgba(179, 38, 30, 0.5),
      0 0 0 6px rgba(179, 38, 30, 0.12);
    animation:
      pulse-fast 0.9s ease-in-out infinite,
      shake 1s ease-in-out infinite;
  }

  .countdown.passed {
    background: rgba(90, 112, 144, 0.14);
    color: #4f5f7d;
    box-shadow: inset 0 0 0 1px rgba(90, 112, 144, 0.3);
    text-decoration: line-through;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1px);
    }
  }

  @keyframes pulse-fast {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px) scale(1.02);
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-1px);
    }
    50% {
      transform: translateX(1px);
    }
    75% {
      transform: translateX(-0.5px);
    }
  }

  .modal-description {
    margin: 0;
    color: var(--text);
    font-size: 1rem;
    line-height: 1.65;
  }

  .primary-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 12px;
    background: linear-gradient(135deg, #38bdf8, #1d4ed8);
    color: #ffffff;
    text-decoration: none;
    font-weight: 800;
    box-shadow: 0 12px 26px rgba(37, 99, 235, 0.22);
    transition: transform 130ms ease, box-shadow 130ms ease;
  }

  .primary-link:hover,
  .primary-link:focus-visible {
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 16px 30px rgba(37, 99, 235, 0.26);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 640px) {
    .search-tools {
      flex-direction: column;
    }

    .filter-tab {
      width: 100%;
    }

    .modal-header,
    .modal-content-grid {
      grid-template-columns: 1fr;
    }

    .modal-header {
      padding-right: 38px;
    }

    .status-card {
      justify-items: start;
      width: 100%;
      text-align: left;
    }

    .detail-grid {
      grid-template-columns: 1fr;
    }

    .overview-section {
      min-height: 0;
    }
  }
</style>