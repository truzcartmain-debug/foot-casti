import { useEffect, useRef } from "react";
import { ADS_ENABLED, AD_SLOTS, type AdSlotName } from "@/config/ads";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  name: AdSlotName;
  className?: string;
}

/**
 * Renders nothing at all while ADS_ENABLED is false — no container, no
 * placeholder, no reserved space, so layouts stay clean in V2.
 */
export function AdSlot({ name, className }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ADS_ENABLED || !ref.current) return;
    const slot = AD_SLOTS[name];
    const script = document.createElement("script");
    script.async = true;
    script.dataset["zone"] = slot.zone;
    script.src = slot.src;
    ref.current.appendChild(script);
  }, [name]);

  if (!ADS_ENABLED) return null;

  return (
    <div
      ref={ref}
      aria-label="Advertisement"
      className={cn(
        "mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/60",
        className,
      )}
    />
  );
}
