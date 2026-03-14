<script lang="ts">
  interface Props {
    name: string
    deadline: string
    daysLeft: number
    description: string
    onclick?: (event: MouseEvent) => void
  }

  let props: Props = $props()

  const countdownClass = () => {
    if (props.daysLeft < 0) return "passed"
    if (props.daysLeft <= 3) return "hot"
    if (props.daysLeft <= 10) return "warm"
    return "calm"
  }

  const countdownLabel = () => (props.daysLeft < 0 ? "Passed" : `${props.daysLeft}d`)

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
    <div class="header-left">
      <div class="name">{props.name}</div>
    </div>
    <div class="deadline">
      <span class={`countdown ${countdownClass()}`}>
        {countdownLabel()}
      </span>
      <div class="deadline-text">
        <span>Deadline</span>
        <strong>{props.deadline}</strong>
      </div>
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
    background: linear-gradient(135deg, #fff5ef, #fffaf2);
    border: 1px solid rgba(179, 38, 30, 0.18);
    box-shadow: 0 12px 30px rgba(179, 38, 30, 0.12);
    cursor: pointer;
    transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
    font-family: "Lato", "Inter", system-ui, -apple-system, sans-serif;

    &:hover,
    &:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 16px 36px rgba(179, 38, 30, 0.18);
      border-color: rgba(179, 38, 30, 0.4);
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(179, 38, 30, 0.32), 0 14px 32px rgba(179, 38, 30, 0.16);
    }
  }

  .header {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 auto;
    min-width: 0;
    flex-wrap: wrap;
  }

  .name {
    font-weight: 800;
    font-size: 1.05rem;
    color: #b3261e;
    line-height: 1.4;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .deadline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 10rem;
    padding: 0.4rem 0.65rem;
    background: rgba(246, 195, 68, 0.14);
    border-radius: 10px;
    border: 1px solid rgba(246, 195, 68, 0.3);
    color: #3f1c12;
  }

  .deadline-text {
    display: grid;
    align-items: center;
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
      color: #b3261e;
    }
  }

  .countdown {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.82rem;
    letter-spacing: 0.02em;
    background: rgba(246, 195, 68, 0.2);
    color: #7a2a1f;
    box-shadow: inset 0 0 0 1px rgba(246, 195, 68, 0.4);
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
