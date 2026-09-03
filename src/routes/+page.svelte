<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { Scholarship, type ScholarshipDTO } from "$lib/scripts/scholarships"

  let { data }: { data: { scholarships: ScholarshipDTO[] } } = $props()

</script>

<section class="hero">
  <p class="eyebrow">Welcome</p>
  <h1>Your one-stop reference for scholarships and summer programs at LCHS</h1>
  <p class="lede">
    Discover opportunities tailored to LCHS students!
  </p>

  <div class="actions">
    <a class="button primary" href="/scholarships">Explore scholarships</a>
    <a class="button ghost" href="/internships">Browse internships</a>
  </div>

  <div class="highlights">
    <div class="tile">
      <span id="pill" class="pill">clear</span>
      <p class="title">all the info</p>
      <p class="copy">
        all the info you need to get working on those applications
      </p>
    </div>
    <div class="tile">
      <span class="pill">easieness</span>
      <p class="title">detaisl</p>
      <p class="copy">search easily and funly</p>
    </div>
  </div>
</section>

<style lang="scss">

</style>
