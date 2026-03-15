<script lang="ts">
    let {showModal = $bindable(), children} = $props<{ showModal?: boolean; children?: () => unknown }>();
    let dialog = $state() as any

    $effect(() => {
		if (showModal) dialog.showModal();
	});

</script>

<dialog bind:this={dialog}
    onclose= {() => (showModal = false)}
    onclick={(e) => { if (e.target === dialog) dialog.close(); }}
    >

    <div class="modal-shell">
      <button class="close" aria-label="Close dialog" autofocus onclick={() => dialog.close()}>
        ×
      </button>

      <div class="modal-body">
        {@render children?.()}
      </div>
    </div>

</dialog>


<style lang="css">
    dialog {
      max-width: 34rem;
      width: min(90vw, 560px);
      border-radius: 18px;
      border: 1px solid rgba(219, 232, 255, 0.8);
      padding: 0;
      background: radial-gradient(120% 120% at 80% 0%, rgba(56, 189, 248, 0.18), transparent 55%),
        linear-gradient(145deg, rgba(37, 99, 235, 0.12), rgba(15, 60, 164, 0.38));
      box-shadow: 0 30px 70px rgba(15, 44, 103, 0.35);
      color: #0b1d36;
      backdrop-filter: blur(12px);
      overflow: hidden;
    }
    dialog::backdrop {
      background: rgba(8, 21, 46, 0.6);
    }
    .modal-shell {
      position: relative;
      padding: 24px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
    }
    .modal-body {
      display: grid;
      gap: 12px;
      color: #0f1f33;
    }
    .close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      border: 1px solid rgba(37, 99, 235, 0.18);
      background: rgba(255, 255, 255, 0.8);
      color: #0b1d36;
      font-size: 1.1rem;
      font-weight: 800;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
    }
    .close:hover,
    .close:focus-visible {
      transform: translateY(-1px);
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
      outline: none;
      background: rgba(255, 255, 255, 0.95);
    }
    dialog[open] {
      animation: zoom 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
      from {
        transform: scale(0.94);
      }
      to {
        transform: scale(1);
      }
    }
    dialog[open]::backdrop {
      animation: fade 0.2s ease-out;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
</style>
