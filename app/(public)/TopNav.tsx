"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BarsIcon from "./BarsIcon";
import CloseIcon from "./CloseIcon";
import { useState } from "react";

type NavigationLink = {
  name: string;
  link: string;
};

type RoutedNavigationLink = {
  name: string;
  link: string;
  active: boolean;
};

function createRoutedNavigationOptions(
  navigation_links: Array<NavigationLink>,
  current_route: string,
): Array<RoutedNavigationLink> {
  return navigation_links.map((navigation_link) => {
    return {
      name: navigation_link.name,
      link: navigation_link.link,
      active: navigation_link.link === current_route,
    };
  });
}

const navigation_links: Array<NavigationLink> = [
  {
    name: "Arcade",
    link: "/arcade",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Contact Me",
    link: "/contact-me",
  },
];

export default function TopNav() {
  const pathname = usePathname();
  const routed_navigation_links = createRoutedNavigationOptions(
    navigation_links,
    pathname,
  );

  const [mobile_nav_open, setMobileNavOpen] = useState(false);

  return (
    <header className="flex h-16 justify-between px-5 lg:h-24 lg:px-16">
      <h2 className="flex items-center space-x-2 text-lg lg:basis-1/2 lg:text-2xl">
        <span>🌱</span>
        <span>Jack Watson</span>
        <span className="slate-600 text-sm lg:text-xl">"Mindful sitting"</span>
      </h2>

      <nav className="flex items-center lg:basis-1/2">
        <button
          id="toggle"
          className="lg:hidden"
          aria-expanded={mobile_nav_open ? true : false}
          onClick={(e) => setMobileNavOpen(true)}
        >
          <span className="sr-only">Navigation Menu</span>
          <BarsIcon className={"text-lime-700"} width={26} height={12} />
        </button>

        <div
          className={
            "absolute top-0 left-0 h-screen w-screen bg-lime-900 opacity-96 lg:static lg:h-auto lg:w-full lg:bg-inherit " +
            (!mobile_nav_open ? "hidden lg:block" : "")
          }
        >
          <button
            className="lg:hidden"
            onClick={(e) => setMobileNavOpen(false)}
          >
            <span className="sr-only">Close Menu</span>
            <CloseIcon
              className="absolute top-6 right-6 text-green-300 lg:hidden"
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
  );
}
