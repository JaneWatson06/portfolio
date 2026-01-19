type NavigationLink = {
  name: string;
  link: string;
};

type RoutedNavigationLink = {
  name: string;
  link: string;
  active: boolean;
};

export function createRoutedNavigationOptions(
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

export const NAVIGATION_LINKS: Array<NavigationLink> = [
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
