<script lang="ts">
  import Modal from "$lib/components/Modal.svelte"
  import SummerCard from "$lib/components/SummerPrograms.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import { fuzzy } from "fast-fuzzy"
  import { Summer, type SummerDTO } from "$lib/scripts/summerprograms"
  import Search from "$lib/components/Search.svelte"
  import IntersectionObserver from "$lib/components/IntersectionObserver.svelte"

  let { data }: { data: { summers: SummerDTO[] } } = $props()
  console.log(data)


  let showModal = $state(false)
  let activeSummer = $state<Summer | null>(null)
  let searchTerm = $state("")
  let hasMore = $state(true)
  let isLoading = $state(false)
  let page = $state(1)
  let baseSummers = $state(data.summers.map(Summer.from))

  async function loadMore() {
  if (isLoading || !hasMore) return
  isLoading = true

  try {
    const res = await fetch(`/api/summerprograms?page=${page}`)
    const json = await res.json()
    const incoming: SummerDTO[] = json.more ?? []

    if (incoming.length === 0) {
      hasMore = false
    } else {
      baseSummers = [...baseSummers, ...incoming.map(Summer.from)]
      page += 1
    }
  } catch (e) {
    console.error('Failed to load more:', e)
  } finally {
    isLoading = false
  }
}

  function handleIntersect() {
    if (!isLoading && hasMore && !searchTerm.trim()) {
      loadMore()
    }
  }

  const openSummer = (summer: Summer) => {
    activeSummer = summer
    showModal = true
  }

  let renderedSummers = $derived(
    searchTerm.trim()
      ? [...baseSummers]
          .map((s) => ({ s, similarity: fuzzy(searchTerm.trim(), s.name) }))
          .sort((a, b) => b.similarity - a.similarity)
          .map(({ s }) => s)
      : baseSummers
  )

</script>

<Search bind:searchTerm />

<section class="summer-grid">
  {#each renderedSummers as summer}
    <SummerCard
      onclick={() => openSummer(summer)}
      name={summer.name}
      deadline={summer.formattedDeadline()}
      daysLeft={summer.daysUntil()}
      description={summer.description}
      endowmentRange={summer.estimated_costRange()}
      filters={summer.displayFilters()}
    />
  {/each}

  <!-- {#if hasMore}
    <IntersectionObserver onintersect={handleIntersect}>
      <div style="height: 1px"></div>
    </IntersectionObserver>
  {/if}

  {#if isLoading}
    <p style="text-align:center; color: #888;">Loading...</p>
  {/if} -->
</section>

<Modal bind:showModal>
  {#if activeSummer}
    <header class="modal-header">
      <div class="meta">
        <p class="eyebrow">Summer</p>
        <h2>{activeSummer.name}</h2>
        {#if activeSummer.estimated_costRange()}
          <p class="award-inline">
            {activeSummer.estimated_costRange()}
          </p>
        {/if}
      </div>
      <div class="deadline">
        <span class={`countdown ${activeSummer.countdownClass()}`}>
          {activeSummer.countdownLabel()}
        </span>
        <div class="deadline-text">
          <span>Deadline</span>
          <strong>{activeSummer.formattedDeadline()}</strong>
        </div>
      </div>
    </header>

    <p class="description">{activeSummer.description}</p>

    {#if activeSummer.primary_link}
      <a
        class="primary-link"
        href={activeSummer.primary_link}
        target="_blank"
        rel="noreferrer"
      >
        View full details
      </a>
    {/if}

    {#if activeSummer.displayFilters().length}
      <div class="tags">
        {#each activeSummer.displayFilters() as filter (filter.key)}
          <Tag color={filter.color} name={filter.name} description={filter.description} />
        {/each}
      </div>
    {/if}
  {/if}
</Modal>

<style lang="scss">
  .summer-grid {
    display: grid;
    gap: 14px;
    margin: 18px 0 32px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
  }

  .meta h2 {
    margin: 2px 0 0;
    font-size: 1.2rem;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    font-size: 0.75rem;
    color: rgba(15, 60, 164, 0.9);
    margin: 0;
  }

  .award-inline {
    margin: 4px 0 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 10px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.25);
    color: #0f5132;
    font-weight: 700;
    width: fit-content;
  }

  .deadline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0.45rem 0.7rem;
    background: rgba(56, 189, 248, 0.16);
    border: 1px solid rgba(56, 189, 248, 0.32);
    border-radius: 10px;
  }

  .deadline-text {
    display: grid;
    align-items: center;
    text-align: right;
    line-height: 1.1;
  }

  .deadline-text span {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #0f3ca4;
  }

  .deadline-text strong {
    font-size: 1rem;
    color: #1d4ed8;
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

  .description {
    margin: 0;
    color: var(--text);
    line-height: 1.55;
  }

  .primary-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 10px;
    background: linear-gradient(135deg, #38bdf8, #1d4ed8);
    color: #0b1f3b;
    text-decoration: none;
    font-weight: 800;
    box-shadow: 0 12px 26px rgba(37, 99, 235, 0.22);
    width: fit-content;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
</style>