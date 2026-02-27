<script lang="ts">
  import Scholarship from "$lib/components/Scholarship.svelte"

  let { data } = $props()

  let formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  let noZero = (str: string): string => str.replace(/^0+(?!$)/, "")

</script>

<div class="border"></div>

<div class="end"></div>


  {#each data.scholarships as scholarship}
    <Scholarship name={scholarship.name} deadline={formatDate(new Date(scholarship.deadline))} description={scholarship.description}/>
  {/each}


<style lang="scss">
</style>
