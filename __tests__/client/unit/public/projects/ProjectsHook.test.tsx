import { useDrag } from "@/app/(public)/projects/hooks";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

const MockCarouselDOM = () => {
  const window_width = 100;
  const carousel_ref = useRef<HTMLUListElement>(null);
  useDrag(carousel_ref, window_width, 1);

  return (
    <>
      <ul
        ref={carousel_ref}
        style={{ left: 0, height: "100px", width: "100px" }}
        data-testid="testing-carousel"
      >
        <li>Slide One</li>
        <li>Slide Two</li>
      </ul>
    </>
  );
};

function mockTouch(
  clientX: number,
  clientY: number,
  target: EventTarget,
): Touch {
  return {
    identifier: 0,
    clientX: clientX,
    clientY: clientY,
    force: 0.01,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
    radiusX: 0,
    radiusY: 0,
    rotationAngle: 0,
    target,
  };
}

test("while transitioning we can't press down", async () => {
  // Arrange
  render(<MockCarouselDOM />);
  const carousel = screen.getByTestId("testing-carousel");
  const spy_add_event_listener = jest.spyOn(carousel, "addEventListener");
  carousel.style.left = "-1000px";

  // Act
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(50, 50, carousel)],
    }),
  );

  // Assert
  expect(spy_add_event_listener).not.toHaveBeenCalled();
});

test("second touch on move cancels current slide gesture", async () => {
  // Arrange
  render(<MockCarouselDOM />);
  const carousel = screen.getByTestId("testing-carousel");

  // Act
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 50, carousel)],
    }),
  );
  // This should scroll because we are listening to the second event from the touch move.
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(60, 60, carousel), mockTouch(20, 50, carousel)],
      changedTouches: [mockTouch(20, 50, carousel)],
    }),
  );

  // Assert
  const current_left_value = parseInt(window.getComputedStyle(carousel).left);
  expect(current_left_value).toBe(-100);
});

test("detecting vertical swipe cancels current swipe", async () => {
  // Arrange
  render(<MockCarouselDOM />);
  const carousel = screen.getByTestId("testing-carousel");
  const spy_remove_event_listener = jest.spyOn(carousel, "removeEventListener");

  // Act
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 40, carousel)],
      changedTouches: [mockTouch(80, 50, carousel)],
    }),
  );

  // Assert - here up will be called removing our event listeners. We nee to make sure this has
  // been called because it means we have canceled our events.
  expect(spy_remove_event_listener).toHaveBeenCalled();
});

test("starting a horizontal swipe will never trigger vertical cancel", async () => {
  // Arrange
  render(<MockCarouselDOM />);
  const carousel = screen.getByTestId("testing-carousel");
  const spy_remove_event_listener = jest.spyOn(carousel, "removeEventListener");

  // Act
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(60, 40, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(60, 10, carousel)],
    }),
  );

  // Assert - not removing the event listeners means we have not called up.
  expect(spy_remove_event_listener).not.toHaveBeenCalled();
});

test("horizontally scrolling to a negative slide keeps us in bounds", async () => {
  // Arrange
  render(<MockCarouselDOM />);
  const carousel = screen.getByTestId("testing-carousel");

  // Act
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(10, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchend", {
      bubbles: true,
      cancelable: true,
      changedTouches: [mockTouch(80, 50, carousel)],
    }),
  );

  // Assert
  const current_left_value = parseInt(window.getComputedStyle(carousel).left);
  expect(current_left_value).toBe(0); // Make sure we are still at zero even though we requested
  // a scroll left.
});

test("horizontally scrolling to past the slide bounds keeps us in bounds", async () => {
  // Arrange
  render(<MockCarouselDOM />);
  const carousel = screen.getByTestId("testing-carousel");

  // Act

  // Swipe One
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(10, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchend", {
      bubbles: true,
      cancelable: true,
      changedTouches: [mockTouch(10, 50, carousel)],
    }),
  );

  // Swipe two.
  await fireEvent(
    carousel,
    new TouchEvent("touchstart", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(80, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchmove", {
      bubbles: true,
      cancelable: true,
      touches: [mockTouch(10, 50, carousel)],
    }),
  );
  await fireEvent(
    carousel,
    new TouchEvent("touchend", {
      bubbles: true,
      cancelable: true,
      changedTouches: [mockTouch(10, 50, carousel)],
    }),
  );

  // Assert
  const current_left_value = parseInt(window.getComputedStyle(carousel).left);
  expect(current_left_value).toBe(-100); // Make sure we are still at negative 100 even though we requested
  // a scroll right.
});
