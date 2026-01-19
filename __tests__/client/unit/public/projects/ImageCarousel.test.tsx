import { render, screen } from "@testing-library/react";

import ImageCarousel from "@/app/(public)/projects/MobileImageCarousel";
import { useDrag } from "@/app/(public)/projects/hooks";

import "html-validate/jest";
import "@testing-library/jest-dom";

jest.mock("@/app/(public)/projects/hooks");

const test_thumbnail_image = {
  url: "/assets/test_image_one.png",
  description: "testing one",
  width: 100,
  height: 100,
};

const test_additional_images = [
  {
    url: "/assets/test_image_two.png",
    description: "testing two",
    width: 100,
    height: 100,
  },
  {
    url: "/assets/test_image_three.png",
    description: "testing three",
    width: 100,
    height: 100,
  },
];

test("projects list renders thumbnail image", () => {
  // Act
  render(
    <ImageCarousel
      id="TestingCarousel"
      carousel_accessibility_name="Testing Carousel"
      thumbnail_image={test_thumbnail_image}
      additional_images={test_additional_images}
    />,
  );

  // Assert
  expect(
    screen.getByRole("img", {
      name: test_thumbnail_image.description,
    }),
  ).toBeInTheDocument();
});

test("projects list renders correct number of image indicators", () => {
  // Act
  render(
    <ImageCarousel
      id="TestingCarousel"
      carousel_accessibility_name="Testing Carousel"
      thumbnail_image={test_thumbnail_image}
      additional_images={test_additional_images}
    />,
  );

  // Assert
  expect(screen.getByRole("meter").children.length).toEqual(3);
});

test("projects list renders additional images", () => {
  // Act
  render(
    <ImageCarousel
      id="TestingCarousel"
      carousel_accessibility_name="Testing Carousel"
      thumbnail_image={test_thumbnail_image}
      additional_images={test_additional_images}
    />,
  );

  // Assert
  expect(
    screen.getByRole("img", {
      name: test_additional_images[1].description,
    }),
  ).toBeInTheDocument();
});

test("color indicator when on the selected slide", () => {
  // Arrange
  (useDrag as jest.Mock).mockReturnValueOnce(2);

  // Act
  render(
    <ImageCarousel
      id="TestingCarousel"
      carousel_accessibility_name="Testing Carousel"
      thumbnail_image={test_thumbnail_image}
      additional_images={test_additional_images}
    />,
  );

  // Assert
  const progress_indicators = screen.getByRole("meter");
  const indicator_to_check = progress_indicators.children[2];
  expect(indicator_to_check).toHaveClass("text-lime-600");
});

test("project list renders one image without indicator", () => {
  // Check for the name of the image carousel for the project that only has one test.

  // Act
  render(
    <ImageCarousel
      id="TestingCarousel"
      carousel_accessibility_name="Testing Carousel"
      thumbnail_image={test_thumbnail_image}
      additional_images={[]}
    />,
  );

  // Assert
  expect(screen.queryByRole("meter")).not.toBeInTheDocument();
});
