<script lang="ts">
  import Modal from "$lib/components/Modal.svelte"
  import ScholarshipCard from "$lib/components/Scholarship.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import { fuzzy } from "fast-fuzzy"
  import { Scholarship, type ScholarshipDTO } from "$lib/scripts/scholarships"
  import Search from "$lib/components/Search.svelte"
  import IntersectionObserver from "$lib/components/IntersectionObserver.svelte"

  let { data }: { data: { scholarships: ScholarshipDTO[] } } = $props()

  let showModal = $state(false)
  let activeScholarship = $state<Scholarship | null>(null)
  let searchTerm = $state("")
  let scholarships = $derived(data.scholarships.map(Scholarship.from))
  

  

  const openScholarship = (scholarship: Scholarship) => {
    activeScholarship = scholarship
    showModal = true
  }

  const sortScholarships = (term: string): Scholarship[] => {
    const query = term.trim()

    return [...scholarships]
      .map((scholarship) => ({
        scholarship,
        similarity: fuzzy(query, scholarship.name),
      }))
      .sort((firstItem, secondItem) => secondItem.similarity - firstItem.similarity)
      .map(({ scholarship }) => scholarship)
  }

  let renderedScholarships: Scholarship[] = $state(sortScholarships(""))
</script>

<Search
  bind:searchTerm
  on:input={() => (renderedScholarships = sortScholarships(searchTerm))}
/>

<section class="scholarship-grid">
  {#each renderedScholarships as scholarship}
    <IntersectionObserver let:intersecting >
      {#if intersecting}
        <ScholarshipCard
          onclick={() => openScholarship(scholarship)}
          name={scholarship.name}
          deadline={scholarship.formattedDeadline()}
          daysLeft={scholarship.daysUntil()}
          description={scholarship.description}
          endowmentRange={scholarship.endowmentRange()}
        />
      {/if}
    </IntersectionObserver>
  {/each}
</section>

<Modal bind:showModal>
  {#if activeScholarship}
    <header class="modal-header">
      <div class="meta">
        <p class="eyebrow">Scholarship</p>
        <h2>{activeScholarship.name}</h2>
        {#if activeScholarship.endowmentRange()}
          <p class="award-inline">
            {activeScholarship.endowmentRange()}
          </p>
        {/if}
      </div>
      <div class="deadline">
        <span class={`countdown ${activeScholarship.countdownClass()}`}>
          {activeScholarship.countdownLabel()}
        </span>
        <div class="deadline-text">
          <span>Deadline</span>
          <strong>{activeScholarship.formattedDeadline()}</strong>
        </div>
      </div>
    </header>

    <p class="description">{activeScholarship.description}</p>

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

    {#if activeScholarship.filters?.filters?.length}
      <div class="tags">
        {#each activeScholarship.filters.filters as tag (tag)}
          <Tag color="gold" name={tag} />
        {/each}
      </div>
    {/if}
  {/if}
</Modal>

<style lang="scss">
  .scholarship-grid {
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
