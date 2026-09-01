import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {siteConfig.footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.siteName} • {siteConfig.tagline}
        </p>
      </div>
    </footer>
  );
}
