/* ==========================================================================
   GLOBAL AD CONFIGURATION (V2)
   --------------------------------------------------------------------------
   Ads are OFF for V2. Flip ADS_ENABLED to true to bring every ad slot on the
   site back to life — no other file needs to change.
   ========================================================================== */

export const ADS_ENABLED = false;

/** Per-slot ad network scripts. Only used when ADS_ENABLED is true. */
export const AD_SLOTS = {
  homeHero: { zone: "11322740", src: "https://5gvci.com/act/files/tag.min.js?z=11322740" },
  watchBelowPlayer: { zone: "11322938", src: "https://nap5k.com/tag.min.js" },
  watchSidebar: { zone: "11322967", src: "https://al5sm.com/tag.min.js" },
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;
