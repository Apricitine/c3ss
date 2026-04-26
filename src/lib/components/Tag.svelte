<script lang="ts">
    const colorHexes = {
        cyan: "#52cfeb",
        red: "#eb5752",
        green: "#65ba6a",
        yellow: "#debe68",
        blue: "#5276eb",
        orange: "#eb8552",
        purple: "#b882e0",
        gold: "#e3ab62"
    }

    type Color = keyof typeof colorHexes;

    interface Tag {
        color: Color
        name: string
        description?: string
    }

    let { color, name, description }: Tag = $props()

</script>

<div class="tag-wrapper">
  <button
    type="button"
    class="tag"
    style={`background-color: ${colorHexes[color]}`}
    aria-label={description ? `${name}: ${description}` : name}
  >
    {name}
  </button>

  {#if description}
    <div class="tooltip" role="tooltip">
      {description}
    </div>
  {/if}
</div>


<style lang="scss">
    .tag-wrapper {
        position: relative;
        display: inline-flex;
    }

    .tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        color: #0b1d36;
        font-weight: 700;
        font-size: 0.82rem;
        letter-spacing: 0.01em;
        cursor: default;
        border: none;
        font-family: inherit;
    }

    .tooltip {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 10px);
        transform: translateX(-50%) translateY(6px);
        min-width: 180px;
        max-width: 260px;
        padding: 8px 10px;
        border-radius: 10px;
        background: rgba(11, 29, 54, 0.96);
        color: #f8fbff;
        font-size: 0.76rem;
        font-weight: 600;
        line-height: 1.35;
        box-shadow: 0 12px 28px rgba(11, 29, 54, 0.24);
        opacity: 0;
        pointer-events: none;
        transition: opacity 140ms ease, transform 140ms ease;
        z-index: 20;
        text-align: center;
    }

    .tooltip::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: rgba(11, 29, 54, 0.96) transparent transparent transparent;
    }

    .tag-wrapper:hover .tooltip,
    .tag-wrapper:focus-within .tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
</style>
