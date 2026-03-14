<script lang="ts">
  import Modal from "$lib/components/Modal.svelte"
  import Scholarship from "$lib/components/Scholarship.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import type { PageServerData } from "../$types"

  let { data }: PageServerData = $props()
  type ScholarshipShape = (typeof data.scholarships)[number]

  let showModal = $state(false)
  let activeScholarship = $state<ScholarshipShape | null>(null)

  const formatDate = (date: Date) =>
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  const daysUntil = (deadline: string) => {
    const msPerDay = 1000 * 60 * 60 * 24
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(deadline)
    target.setHours(0, 0, 0, 0)
    return Math.ceil((target.getTime() - today.getTime()) / msPerDay)
  }

  const countdownClass = (days: number) => {
    if (days < 0) return "passed"
    if (days <= 3) return "hot"
    if (days <= 10) return "warm"
    return "calm"
  }

  const countdownLabel = (days: number) => (days < 0 ? "Passed" : `${days} days`)

  const openScholarship = (scholarship: ScholarshipShape) => {
    activeScholarship = scholarship
    showModal = true
  }
</script>

<section class="scholarship-grid">
  {#each data.scholarships as scholarship (scholarship.id)}
    <Scholarship
      onclick={() => openScholarship(scholarship)}
      name={scholarship.name}
      deadline={formatDate(new Date(scholarship.deadline))}
      daysLeft={daysUntil(scholarship.deadline)}
      description={scholarship.description}
    />
  {/each}
</section>

<Modal bind:showModal>
  {#if activeScholarship}
    <header class="modal-header">
      <div class="meta">
        <p class="eyebrow">Scholarship</p>
        <h2>{activeScholarship.name}</h2>
      </div>
      <div class="deadline">
        <span class={`countdown ${countdownClass(daysUntil(activeScholarship.deadline))}`}>
          {countdownLabel(daysUntil(activeScholarship.deadline))}
        </span>
        <div class="deadline-text">
          <span>Deadline</span>
          <strong>{formatDate(new Date(activeScholarship.deadline))}</strong>
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
    color: #8a1f18;
    margin: 0;
  }

  .deadline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0.45rem 0.7rem;
    background: rgba(246, 195, 68, 0.16);
    border: 1px solid rgba(246, 195, 68, 0.32);
    border-radius: 10px;
    min-width: 9.5rem;
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
    color: #7a2a1f;
  }

  .deadline-text strong {
    font-size: 1rem;
    color: #b3261e;
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
    background: rgba(246, 195, 68, 0.2);
    color: #7a2a1f;
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
    animation: pulse 1.4s ease-in-out infinite;
  }

  .countdown.hot {
    background: rgba(179, 38, 30, 0.22);
    color: #b3261e;
    box-shadow: inset 0 0 0 1px rgba(179, 38, 30, 0.5), 0 0 0 6px rgba(179, 38, 30, 0.12);
    animation: pulse-fast 0.9s ease-in-out infinite, shake 1.6s ease-in-out infinite;
  }

  .countdown.passed {
    background: rgba(64, 54, 50, 0.14);
    color: #4a3f3b;
    box-shadow: inset 0 0 0 1px rgba(64, 54, 50, 0.3);
    text-decoration: line-through;
  }

  @keyframes pulse {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-1px); }
  }

  @keyframes pulse-fast {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px) scale(1.02); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-1px); }
    50% { transform: translateX(1px); }
    75% { transform: translateX(-0.5px); }
  }

  .description {
    margin: 0;
    color: #2b1a12;
    line-height: 1.55;
  }

  .primary-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f6c344, #b3261e);
    color: #2c0f0b;
    text-decoration: none;
    font-weight: 800;
    box-shadow: 0 12px 26px rgba(179, 38, 30, 0.22);
    width: fit-content;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
</style>
