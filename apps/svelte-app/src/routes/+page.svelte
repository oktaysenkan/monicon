<script>
  import { Iconify } from "@oktaytest/svelte";
</script>

<main>
  <Iconify name="mdi:home" size={24} />
  <Iconify name="logos:active-campaign" />
  <Iconify name="logos:apache-superset-icon" />
  <Iconify name="invalid:icon" color="red" />
</main>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #242424;
    color: rgba(255, 255, 255, 0.87);
  }
</style>
