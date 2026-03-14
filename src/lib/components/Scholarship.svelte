<script lang="ts">
  interface Props {
    name: string
    deadline: string
    description: string
    onclick?: (event: MouseEvent) => void
  }

  let props: Props = $props()

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      props.onclick?.(event as unknown as MouseEvent)
    }
  }
</script>

<section
  class="scholarship-card"
  role="button"
  tabindex="0"
  on:click={props.onclick}
  on:keydown={handleKeydown}
>
  <div class="header">
    <div class="name">{props.name}</div>
    <div class="deadline">
      <span>Deadline</span>
      <strong>{props.deadline}</strong>
    </div>
  </div>

  <p class="description">{props.description}</p>
</section>

<style lang="scss">
  .scholarship-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem 1rem;
    align-items: start;
    width: 100%;
    padding: 1rem 1.25rem;
    border-radius: 14px;
    background: linear-gradient(135deg, #f7fbff, #eef5ff);
    border: 1px solid rgba(34, 140, 233, 0.18);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
    font-family: "Lato", "Inter", system-ui, -apple-system, sans-serif;

    &:hover,
    &:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 16px 36px rgba(34, 140, 233, 0.18);
      border-color: rgba(34, 140, 233, 0.35);
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(34, 140, 233, 0.35), 0 14px 32px rgba(34, 140, 233, 0.16);
    }
  }

  .header {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .name {
    font-weight: 800;
    font-size: 1.05rem;
    color: rgb(26, 109, 188);
    line-height: 1.4;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .deadline {
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    justify-items: end;
    min-width: 8rem;
    padding: 0.4rem 0.65rem;
    background: rgba(34, 140, 233, 0.08);
    border-radius: 10px;
    border: 1px solid rgba(34, 140, 233, 0.16);
    color: #1b2b40;
    text-align: right;
    line-height: 1.1;

    span {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: rgba(27, 43, 64, 0.7);
    }

    strong {
      font-size: 0.95rem;
      font-weight: 800;
      color: #0e6bcf;
    }
  }

  .description {
    grid-column: 1 / -1;
    margin: 0;
    color: #3a4b63;
    line-height: 1.5;
    font-size: 0.98rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 720px) {
    .scholarship-card {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .deadline {
      justify-items: start;
      width: 100%;
    }

    .name {
      white-space: normal;
    }
  }

  @media (max-width: 480px) {
    .scholarship-card {
      padding: 0.9rem 1rem;
      border-radius: 12px;
    }

    .description {
      -webkit-line-clamp: 4;
    }
  }
</style>
