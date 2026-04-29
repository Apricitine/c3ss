<script lang="ts">
	import { onMount } from 'svelte'
	//as you scroll down you access 
	//query the database to get more entries, updating data progressively'
	//what you need to do is when you scroll down you send a request to query more scholarships
	//Steps
	//1. make it so that you only render in a few scholarships
	//2. Make it so that when you have white space you send a request to the database to query another scholarship
	//3. After you query that scholarship the entire thing renders in
	//4. Fix searching aftert scholarship the entire thing renders in
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
				} 
					else { 
						if (intersecting == false){
							intersecting = entries[0].isIntersecting
						}
					}
			}, {
				rootMargin
			})
			observer.observe(container)
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
                }
			}
		}

		window.addEventListener('scroll', handler)
		return () => window.removeEventListener('scroll', handler)
	})
</script>

<style>
	div {
		width: 100%;
		height: 100%
	}
</style>

<div bind:this={container}>
	<slot {intersecting}></slot>
</div>
