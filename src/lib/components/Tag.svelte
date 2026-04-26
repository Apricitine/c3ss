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
    }

    let { color, name }: Tag = $props()

</script>



<div class="tag" style={`background-color: ${colorHexes[color]}`}>
  {name}
</div>


<style lang="scss">
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
    }
</style>
