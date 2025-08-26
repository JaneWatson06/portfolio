import Projects from "@/app/(public)/projects/page";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import "html-validate/jest";
import { axe } from "jest-axe";

// Most important things to accessbility.
// - alt tags on the image.
// - Head heirarchy.
// - Semantic html, sections can have a header. Sections should always have a heading.
// - Main tag.
// - Nav tag. Unordered list for the navigation elements.
// - Each page must have an h1.
// - Labels on forms.

test("project list page renders valid HTML.", async () => {
  const { container } = render(await Projects());

  expect(container.innerHTML).toHTMLValidate();
});

test("accessability of page.", async () => {
  const { container } = render(await Projects());

  await act(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });
});

test("displaying the project name", async () => {
  const { container } = render(await Projects());

  expect(screen.getByText(/testing\.png/i)).toHTMLValidate();
});
test("displaying the project tags");
test("displaying the primary link");
test("displaying the projects thumbnail");
