<script lang="ts">
  import { onMount } from 'svelte'
  import type { Snippet } from 'svelte'

  let {
    children,
    onintersect,
    once = false,
    rootMargin = '0px'
  }: {
    children: Snippet
    onintersect: () => void
    once?: boolean
    rootMargin?: string
  } = $props()

  let container = $state<HTMLDivElement | null>(null)

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onintersect()
          if (once) observer.disconnect()
        }
      },
      { rootMargin }
    )

    if (container) observer.observe(container)
    return () => observer.disconnect()
  })
</script>

<div bind:this={container}>
  {@render children()}
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>