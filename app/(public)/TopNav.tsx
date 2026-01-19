"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BarsIcon from "./BarsIcon";
import CloseIcon from "./CloseIcon";
import { useState } from "react";
import { createRoutedNavigationOptions, NAVIGATION_LINKS } from "./libs";

export default function TopNav() {
  const pathname = usePathname();
  const routed_navigation_links = createRoutedNavigationOptions(
    NAVIGATION_LINKS,
    pathname,
  );

  const [mobile_nav_open, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="fixed z-10 flex h-16 w-full justify-between bg-white px-5 lg:h-24 lg:border-b lg:border-slate-400 lg:px-16">
        <h2 className="flex items-center space-x-2 text-lg lg:basis-1/2 lg:text-2xl">
          <span>🌱</span>
          <span>Jane Watson</span>
          <span className="slate-600 text-sm lg:text-xl">
            "Mindful sitting"
          </span>
        </h2>

        <nav className="flex items-center lg:basis-1/2">
          <button
            id="toggle"
            className="flex h-8 w-8 items-center justify-end lg:hidden"
            aria-expanded={mobile_nav_open ? true : false}
            onClick={(e) => setMobileNavOpen(true)}
          >
            <span className="sr-only">Navigation Menu</span>
            <BarsIcon
              className={"pointer-events-none text-lime-700"}
              width={26}
              height={12}
            />
          </button>

          <div
            className={
              "absolute top-0 left-0 h-screen w-screen bg-lime-900 opacity-96 lg:static lg:h-auto lg:w-full lg:bg-inherit " +
              (!mobile_nav_open ? "hidden lg:block" : "")
            }
          >
            <button
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-end lg:hidden"
              onClick={(e) => setMobileNavOpen(false)}
            >
              <span className="sr-only">Close Menu</span>
              <CloseIcon
                className="pointer-events-none text-green-300"
                width={19.5}
                height={19.5}
              />
            </button>
            <ul className="flex h-full w-full flex-col justify-center gap-3 pl-7 lg:flex lg:w-full lg:flex-row lg:justify-end lg:space-x-2">
              {routed_navigation_links.map((routed_navigation_link) => {
                return (
                  <li key={routed_navigation_link.link}>
                    {routed_navigation_link.active && (
                      <span className="sr-only">Current Page: </span>
                    )}
                    <Link
                      className={
                        "font-fredoka lg:text-2x text-lg text-white lg:text-2xl " +
                        (routed_navigation_link.active
                          ? "underline decoration-green-300 decoration-3 underline-offset-6 lg:text-lime-900 lg:decoration-lime-900"
                          : "lg:text-black")
                      }
                      href={routed_navigation_link.link}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {routed_navigation_link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
      {/* Empty div for spacing of the top content */}
      <div className="h-16 lg:h-24"></div>
    </>
  );
}
