<script lang="ts">


    const colorHexes = {
        cyan: "#e0f2fe",
        red: "#dbeafe",
        green: "#c7d2fe",
        yellow: "#bfdbfe",
        orange: "#93c5fd",
        purple: "#a5b4fc",
        gold: "#cddcff"
    }

    type Color = keyof typeof colorHexes;

    interface Tag {
        color: Color
        name: string
    }

    let { color, name } = $props<Tag>()

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
