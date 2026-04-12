<script lang="ts">
    const options: IntersectionObserverInit = {
        root: document.querySelector("#scrollArea"),
        rootMargin: "0px",
        threshold: 1.0,
    }
    let container
    export let once = false
    let intersecting = false
    const observer = new IntersectionObserver(entries => {
        intersecting = entries[0].isIntersecting
        if (intersecting && once) {
            observer.unobserve(container)
        }
    })

    observer.observe(continer)
    return () => observer.unobserve(container)

    function handler(): void {
        const bcr: DOMRect = container.getBoundingClientRect();
        intersecting =
            bcr.bottom + bottom > 0 &&
            bcr.right + right > 0 &&
            bcr.top - top < window.innerHeight &&
            bcr.left - left < window.innerWidth;
    }


</script>