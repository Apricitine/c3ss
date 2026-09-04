<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { Scholarship, type ScholarshipDTO } from "$lib/scripts/scholarships"

  let { data }: { data: { scholarships: ScholarshipDTO[] } } = $props()

</script>

<section class="home">
  <p class="eyebrow">Welcome</p>
  <h1>Your one-stop reference for scholarships and summer programs at LCHS</h1>
  <p class="lede">
    Discover opportunities tailored to LCHS students!
  </p>

  <div class="actions">
    <a class="button primary" href="/scholarships">Explore scholarships</a>
    <a class="button ghost" href="/internships">Browse summer programs</a>
  </div>
</section>

<style lang="scss">
  @use "$lib/styles/global.scss" as *;
  
  .home {
    background: linear-gradient(135deg, rgba(248, 66, 56, 0.5), rgba(216, 179, 29, 0.08));
    box-shadow:
      0 14px 32px rgba(164, 37, 15, 0.15),
      0 2px 6px rgba(0, 0, 0, 0.04);
    padding: 44px 42px 48px;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(248, 66, 56, 0.3);
  }

  .actions {
    // background: 
    position: flex;
    display: relative;
    gap: 12px;
    margin-bottom: 26px;

  }
  
  .button {
    text-decoration: none;
    border-radius: 14px;
    padding: 12px 16px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease, color 120ms ease;
    border: 1px solid transparent;
  }

  .button.primary {
    background: linear-gradient(135deg, #f5c076, #c7432c);
    color: #0b1f3b;
    border-color: rgba(216, 66, 29, 0.55);
    box-shadow:
      0 16px 34px rgba(216, 116, 29, 0.18),
      0 0 0 2px rgba(248, 168, 56, 0.3);
  }

  .button.ghost {
    background: rgba(56, 189, 248, 0.14);
    color: #f3f7ff;
    border-color: rgba(56, 189, 248, 0.32);
  }


  

</style>
