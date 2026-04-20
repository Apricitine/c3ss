<script lang="ts">
	import { onMount } from 'svelte';

	export let once: boolean = false
	export let top: number = 0
	export let bottom: number = 0
	export let left: number = 0
	export let right: number = 0

	let intersecting: boolean = false
	let container: HTMLDivElement

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
			const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
				if (once) {
                    if (entries[0].isIntersecting) {
                        intersecting = true
                        observer.unobserve(container)
                    }
					} else {
						intersecting = entries[0].isIntersecting
					}
			}, {
				rootMargin
			});
			observer.observe(container);
			return () => observer.unobserve(container)
		}

		function handler(): void {
			const bcr: DOMRect = container.getBoundingClientRect();
			const currIntersecting = (
				(bcr.bottom + bottom) > 0 &&
				(bcr.right + right) > 0 &&
				(bcr.top - top) < window.innerHeight &&
				(bcr.left - left) < window.innerWidth
			);
			if (once) {
                if (currIntersecting) {
                    intersecting = true
                    window.removeEventListener("scroll", handler)
                } else {
                    intersecting = currIntersecting;
                }
			}
            

		}

		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div bind:this={container}>
	<slot {intersecting}></slot>
</div>