<section class="hero">
  <p class="eyebrow">Welcome</p>
  <h1>your one-stop reference for scholarships and internships at LCHS</h1>
  <p class="lede">
    discover opportunities tailored to you LCHS students! don't waste time on irrelevant stuff
  </p>

  <div class="actions">
    <a class="button primary" href="/scholarships">explore scholarships</a>
    <a class="button ghost" href="/internships">browse internships</a>
  </div>

  <div class="highlights">
    <div class="tile">
      <span class="pill">stay up to do</span>
      <p class="title">deadlines</p>
      <p class="copy">idek idek</p>
    </div>
    <div class="tile">
      <span class="pill">clear</span>
      <p class="title">all the info</p>
      <p class="copy">all the info you need to get working on those applications</p>
    </div>
    <div class="tile">
      <span class="pill">easieness</span>
      <p class="title">detaisl</p>
      <p class="copy">search easily and funly</p>
    </div>
  </div>
</section>

<style lang="scss">
  .hero {
    background: linear-gradient(145deg, #2b0c0c, #7a1b16 38%, #b3261e 100%);
    color: #fff6ec;
    padding: 44px 42px 48px;
    border-radius: 24px;
    box-shadow: 0 24px 48px rgba(61, 10, 8, 0.32);
    position: relative;
    overflow: hidden;
  }

  .hero::after {
    content: "";
    position: absolute;
    inset: -50% 40% auto auto;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(246, 195, 68, 0.24), transparent 60%);
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
    background: linear-gradient(135deg, #f6c344, #b3261e);
    color: #2c0f0b;
    box-shadow: 0 14px 30px rgba(179, 38, 30, 0.35);
  }

  .button.ghost {
    background: rgba(246, 195, 68, 0.14);
    color: #fff6ec;
    border-color: rgba(246, 195, 68, 0.32);
  }

  .button:hover,
  .button:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 16px 34px rgba(179, 38, 30, 0.26);
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
    border: 1px solid rgba(246, 195, 68, 0.28);
    border-radius: 16px;
    padding: 14px 16px;
    box-shadow: inset 0 0 0 1px rgba(246, 195, 68, 0.14);
  }

  .pill {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(246, 195, 68, 0.3);
    color: #2c0f0b;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.02em;
  }

  .tile .title {
    margin: 10px 0 6px;
    font-weight: 700;
    color: #fff6ec;
  }

  .tile .copy {
    margin: 0;
    color: rgba(255, 246, 236, 0.8);
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    .hero {
      padding: 28px 24px 32px;
    }
  }
</style>
