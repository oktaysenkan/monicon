export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-10-05",
  modules: ["@monicon/nuxt"],
  monicon: {
    icons: [
      "mdi:home",
      "mdi:account",
      "mdi:account-badge-outline",
      "feather:activity",
      "feather:alert-circle",
      "logos:active-campaign",
      "logos:apache-superset-icon",
      "lucide:badge-check",
    ],
    collections: ["lucide"],
    outputFileName: "nuxt",
  },
});
