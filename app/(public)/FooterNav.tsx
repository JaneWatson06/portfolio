"use client";

import { usePathname } from "next/navigation";
import { createRoutedNavigationOptions, NAVIGATION_LINKS } from "./libs";
import Link from "next/link";

export default function FooterNav() {
  const pathname = usePathname();
  const routed_navigation_links = createRoutedNavigationOptions(
    NAVIGATION_LINKS,
    pathname,
  );

  return (
    <ul className="flex-col justify-center gap-1">
      {routed_navigation_links.map((routed_navigation_link) => {
        return (
          <li key={routed_navigation_link.link}>
            {routed_navigation_link.active && (
              <span className="sr-only">Current Page: </span>
            )}
            <Link
              className={
                "font-fredoka text-white " +
                (routed_navigation_link.active
                  ? "underline decoration-green-300 decoration-2 underline-offset-6"
                  : "")
              }
              href={routed_navigation_link.link}
            >
              {routed_navigation_link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
