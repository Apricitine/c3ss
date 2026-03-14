<script lang="ts">


    const colorHexes = {
        cyan: "#00FFFF",
        red: "#FF0000",
        green: "#008000",
        yellow: "#FFEA00",
        orange: "#FF8C00",
        purple: "#9F2B6",
        gold: "#F6C344"
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
        color: #2b1a12;
        font-weight: 700;
        font-size: 0.82rem;
        letter-spacing: 0.01em;
    }
</style>
