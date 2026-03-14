<section class="hero">
  <p class="eyebrow">Welcome</p>
  <h1>Scholarships and internships, curated and clear.</h1>
  <p class="lede">
    Discover opportunities without digging through clutter. We surface deadlines, summaries,
    and details in one sleek place so you can focus on applying.
  </p>

  <div class="actions">
    <a class="button primary" href="/scholarships">Explore scholarships</a>
    <a class="button ghost" href="/internships">Browse internships</a>
  </div>

  <div class="highlights">
    <div class="tile">
      <span class="pill">Up-to-date</span>
      <p class="title">Fresh deadlines</p>
      <p class="copy">See what’s upcoming at a glance with crisp deadline pills.</p>
    </div>
    <div class="tile">
      <span class="pill">Clarity</span>
      <p class="title">Readable summaries</p>
      <p class="copy">Skim concise descriptions styled for quick scanning.</p>
    </div>
    <div class="tile">
      <span class="pill">Momentum</span>
      <p class="title">One-click detail</p>
      <p class="copy">Tap a card to open the modal and keep moving.</p>
    </div>
  </div>
</section>

<style lang="scss">
  .hero {
    background: linear-gradient(145deg, #0f1f33, #133a66 35%, #0e6bcf 100%);
    color: #eef4ff;
    padding: 44px 42px 48px;
    border-radius: 24px;
    box-shadow: 0 24px 48px rgba(9, 19, 33, 0.28);
    position: relative;
    overflow: hidden;
  }

  .hero::after {
    content: "";
    position: absolute;
    inset: -50% 40% auto auto;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 60%);
    filter: blur(10px);
    transform: rotate(-12deg);
  }

  .eyebrow {
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
    margin: 0 0 10px;
    color: rgba(255, 255, 255, 0.7);
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(1.9rem, 3.2vw, 2.4rem);
    line-height: 1.2;
  }

  .lede {
    margin: 0 0 20px;
    max-width: 650px;
    color: rgba(238, 244, 255, 0.86);
    font-size: 1.02rem;
    line-height: 1.55;
  }

  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
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
    background: linear-gradient(135deg, #24c2ff, #0e6bcf);
    color: #0c182b;
    box-shadow: 0 14px 30px rgba(12, 104, 186, 0.35);
  }

  .button.ghost {
    background: rgba(255, 255, 255, 0.08);
    color: #eef4ff;
    border-color: rgba(255, 255, 255, 0.25);
  }

  .button:hover,
  .button:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 16px 34px rgba(12, 104, 186, 0.25);
    outline: none;
  }

  .highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-top: 10px;
    position: relative;
    z-index: 1;
  }

  .tile {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    padding: 14px 16px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  .pill {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    color: #fff;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.02em;
  }

  .tile .title {
    margin: 10px 0 6px;
    font-weight: 700;
    color: #fff;
  }

  .tile .copy {
    margin: 0;
    color: rgba(238, 244, 255, 0.8);
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    .hero {
      padding: 28px 24px 32px;
    }
  }
</style>
