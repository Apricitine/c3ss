<script lang="ts">
  import { tick, type Snippet } from "svelte"

  interface Props {
    showModal?: boolean
    children?: Snippet
    sourceRect?: DOMRect | null
  }

  let { showModal = $bindable(), children, sourceRect = null }: Props = $props()
  let dialog = $state<HTMLDialogElement | null>(null)

  const nextFrame = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve())
    })

  const animateOpen = async () => {
    if (!dialog) return

    await tick()
    await nextFrame()

    const targetRect = dialog.getBoundingClientRect()

    if (!targetRect.width || !targetRect.height) return

    const transition = sourceRect
      ? (() => {
          const sourceCenterX = sourceRect.left + sourceRect.width / 2
          const sourceCenterY = sourceRect.top + sourceRect.height / 2
          const targetCenterX = targetRect.left + targetRect.width / 2
          const targetCenterY = targetRect.top + targetRect.height / 2

          return dialog.animate(
            [
              {
                opacity: 0.72,
                borderRadius: "14px",
                transform: `translate(${sourceCenterX - targetCenterX}px, ${sourceCenterY - targetCenterY}px) scale(${sourceRect.width / targetRect.width}, ${sourceRect.height / targetRect.height})`,
              },
              {
                opacity: 1,
                borderRadius: "18px",
                transform: "translate(0, 0) scale(1, 1)",
              },
            ],
            {
              duration: 280,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
            },
          )
        })()
      : dialog.animate(
          [
            {
              opacity: 0,
              transform: "translateY(18px) scale(0.96)",
            },
            {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          ],
          {
            duration: 220,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        )

    try {
      await transition.finished
    } catch {
      transition.cancel()
    }
  }

  $effect(() => {
    if (!dialog) return

    if (showModal && !dialog.open) {
      dialog.showModal()
      void animateOpen()
      return
    }

    if (!showModal && dialog.open) {
      dialog.close()
    }
  })
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (dialog && e.target === dialog) dialog.close()
  }}
>
  <div class="modal-shell">
    <button class="close" aria-label="Close dialog" onclick={() => dialog?.close()}>
      ×
    </button>

    <div class="modal-body">
      {@render children?.()}
    </div>
  </div>

</dialog>


<style lang="css">
    dialog {
      width: min(50vw, calc(100vw - 2rem));
      border-radius: 18px;
      border: 1px solid rgba(219, 232, 255, 0.8);
      padding: 0;
      background: radial-gradient(120% 120% at 80% 0%, rgba(56, 189, 248, 0.18), transparent 55%),
        linear-gradient(145deg, rgba(37, 99, 235, 0.12), rgba(15, 60, 164, 0.38));
      box-shadow: 0 30px 70px rgba(15, 44, 103, 0.35);
      color: #0b1d36;
      backdrop-filter: blur(12px);
      overflow: hidden;
      transform-origin: center center;
      will-change: transform, opacity;
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
