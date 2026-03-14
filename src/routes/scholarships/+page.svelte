<script lang="ts">
    import type { PageServerData } from "../$types";
    import Modal from "$lib/components/Modal.svelte"
    import Scholarship from "$lib/components/Scholarship.svelte"
    import Tag from "$lib/components/Tag.svelte"
    
    let { data }: PageServerData = $props()
    let showModal = $state(false)

    let formatDate = (date: Date) =>
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    let noZero = (str: string): string => str.replace(/^0+(?!$)/, "")

    console.log(data)
</script>

{#each data.scholarships as scholarship}
    <Scholarship onclick={() => (showModal = true)}
        name={scholarship.name}
        deadline={formatDate(new Date(scholarship.deadline))}
        description={scholarship.description}
    />
{/each}


<Modal bind:showModal>
    hi
    <Tag color="cyan" name="monkey"></Tag>
</Modal>