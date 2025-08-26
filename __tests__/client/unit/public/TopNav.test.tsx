import { logRoles, render, screen } from "@testing-library/react";

import TopNav from "@/app/(public)/TopNav";
import { usePathname } from "next/navigation";
import userEvent from "@testing-library/user-event";

import "html-validate/jest";
import "@testing-library/jest-dom";

// Mock usePathname(), test to see if we have a specifc class attached.
// How can we test under a specific device size so we can test to see if the
jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/arcade"),
}));

const mock_use_pathname = usePathname as jest.Mock;

//https://www.w3.org/WAI/tutorials/menus/structure/#indicate-the-current-item
test("picking the correct navigation link based on our current route", () => {
  mock_use_pathname.mockReturnValue("/contact-me");

  render(<TopNav />);

  const current_page_text = screen.getByText(/current page/i);
  const select_link = current_page_text.nextElementSibling;

  expect(select_link).toHaveAttribute("href", "/contact-me");
});

test("skip picking a link when we pass in a incorrect route", () => {
  mock_use_pathname.mockReturnValue("/projects");

  render(<TopNav />);

  expect(
    screen.getByRole("link", {
      name: /arcade/i,
    }),
  ).not.toHaveClass("underline");
});

test("navigation button opens on mobile tap", async () => {
  const user = userEvent.setup();

  render(<TopNav />);

  const navigation_menu_button = screen.getByRole("button", {
    name: /navigation menu/i,
  });

  await user.click(navigation_menu_button);

  expect(navigation_menu_button.nextElementSibling).not.toHaveClass("hidden");
});

test("navigation button sets aria-expanded", async () => {
  const user = userEvent.setup();

  render(<TopNav />);

  const navigation_menu_button = screen.getByRole("button", {
    name: /navigation menu/i,
  });

  await user.click(navigation_menu_button);

  expect(navigation_menu_button).toHaveAttribute("aria-expanded", "true");
});

test("closing mobile menu on x button tap", async () => {
  // How can we render something on mobile and then see if it's open once we tap it.
  const user = userEvent.setup();

  render(<TopNav />);

  const navigation_menu_button = screen.getByRole("button", {
    name: /navigation menu/i,
  });
  const close_menu_button = screen.getByRole("button", {
    name: /close menu/i,
  });

  await user.click(navigation_menu_button);
  await user.click(close_menu_button);

  expect(navigation_menu_button.nextElementSibling).toHaveClass("hidden");
});

test("closing mobile menu sets aria-expanded", async () => {
  // How can we render something on mobile and then see if it's open once we tap it.
  const user = userEvent.setup();

  render(<TopNav />);

  const navigation_menu_button = screen.getByRole("button", {
    name: /navigation menu/i,
  });
  const close_menu_button = screen.getByRole("button", {
    name: /close menu/i,
  });

  await user.click(navigation_menu_button);
  await user.click(close_menu_button);

  expect(navigation_menu_button).toHaveAttribute("aria-expanded", "false");
});
