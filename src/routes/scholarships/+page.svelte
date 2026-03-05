<script>
    import Modal from '/src/lib/components/Modal.svelte';
    let showModal = $state(false);

</script>


<button onclick={() => (showModal = true)}>show modal</button>


<Modal bind:showModal>
hi
</Modal>

<dialog>
</dialog>


<style>
    dialog {
		border-radius: 5px;
		border-width: 1px;
		transition: all 2s;
	}
</style>