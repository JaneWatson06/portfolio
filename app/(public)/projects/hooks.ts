import { RefObject, useEffect, useRef, useState } from "react";

type TouchEventHandler = (ev: TouchEvent) => any;

const SWIPE_THRESHOLD = 50;

export const useDrag = (
  carousel_ref: RefObject<HTMLUListElement | null>,
  carousel_width: number,
  transition_time_ms: number,
) => {
  /**
   * This hook works by essentially hooking into the touch events and overriding scroll behavior.
   * When we detect a swipe that's past the horizontal threshold we'll set a css transition to
   * trigger a swipe animation. To prevent vertical scroll we have a flag detecting if a horziontal
   * move has already started. If it has we prevent the default scroll behavior.
   *
   * Another important aspect of this code are the passive events. React does not allow you to
   * assign non-passive events (so we can call `.preventDefault()` and cancel scrolling), so we
   * must do this all with the regular browser API.
   */
  const non_passive_event = {
    passive: false,
  };

  const [transitioned_slide, setTransitionedSlide] = useState(0);
  const start_touch = useRef<Touch>(null);
  const current_slide = useRef(0);
  const left_transition_to = useRef(0);
  const moving_horizontally = useRef(false);
  const drag_events = useRef<
    [TouchEventHandler | undefined, TouchEventHandler | undefined]
  >([undefined, undefined]);

  const removeDragEvents = (carousel_ref: HTMLUListElement) => {
    if (drag_events.current[0] != undefined) {
      carousel_ref.removeEventListener("touchmove", drag_events.current[0]);
    }

    if (drag_events.current[1] != undefined) {
      carousel_ref.removeEventListener("touchend", drag_events.current[1]);
    }
  };

  const slideInBounds = (slide: number, total_slides: number) => {
    if (slide < 0) {
      return 0;
    }

    if (slide >= total_slides) {
      return total_slides - 1;
    }

    return slide;
  };

  const snapToImage = (carousel_ref: HTMLUListElement, slide: number) => {
    // This function will take in the slide number we want to snap the carousel to. It will
    // do this by adding a transition to the carousel wrapper that will transition it over to
    // the left. While we are transition we should not allow new touch starts.
    const slide_to_snap = slideInBounds(slide, carousel_ref.children.length);
    const left_transition = -(slide_to_snap * carousel_width);

    carousel_ref.style.transition = `left ${transition_time_ms}ms ease-in-out`;
    carousel_ref.style.left = `${left_transition}px`;
    current_slide.current = slide_to_snap;
    left_transition_to.current = left_transition;
    setTimeout(() => setTransitionedSlide(slide_to_snap), transition_time_ms);
  };

  const up = (carousel_ref: HTMLUListElement, e: TouchEvent) => {
    removeDragEvents(carousel_ref);

    if (start_touch.current == null) {
      return;
    }

    const current_touch = e.changedTouches[0];

    // Determine if we moved enough for a swipe.
    const delta = start_touch.current.clientX - current_touch.clientX;
    const horizontal_distance = Math.abs(delta);
    if (horizontal_distance > SWIPE_THRESHOLD) {
      if (delta < 0) {
        // Swiped left
        snapToImage(carousel_ref, current_slide.current - 1);
      } else {
        // Swipe Right
        snapToImage(carousel_ref, current_slide.current + 1);
      }
    } else {
      snapToImage(carousel_ref, current_slide.current);
    }

    moving_horizontally.current = false;
    start_touch.current = null;
  };

  const move = (carousel_ref: HTMLUListElement, e: TouchEvent) => {
    if (e.touches.length >= 2 || start_touch.current == null) {
      // Cancel move with two fingers.
      return up(carousel_ref, e);
    }

    const current_touch = e.touches[0];
    // Detect if we did did a vertical scroll or not.
    const y_axis_diff = Math.abs(
      start_touch.current.clientY - current_touch.clientY,
    );
    const x_axis_diff = Math.abs(
      start_touch.current.clientX - current_touch.clientX,
    );

    if (!moving_horizontally.current && y_axis_diff > x_axis_diff) {
      // We are scrolling vertically remove the touchmove and touchend handlers.
      up(carousel_ref, e);
      return;
    }
    moving_horizontally.current = true;

    // Track the amount the user is moving the screen by until they release.
    const left_value =
      -(current_slide.current * carousel_width) -
      (start_touch.current.clientX - current_touch.clientX);
    carousel_ref.style.left = `${left_value}px`;

    e.preventDefault();
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (carousel_ref.current) {
      up(carousel_ref.current, e);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (carousel_ref.current) {
      move(carousel_ref.current, e);
    }
  };

  const down = (carousel_ref: HTMLUListElement, e: TouchEvent) => {
    // If the current value is not at the value we are transitioning to then don't track the current
    // touch. This is because we are transitioning to the slide that we swept to.
    const current_left_value = parseInt(
      window.getComputedStyle(carousel_ref).left,
    );
    if (current_left_value != left_transition_to.current) {
      return;
    }

    carousel_ref.style.transition = "unset"; // Unset so we don't transition when we do a touch move.
    start_touch.current = e.touches[0];
    carousel_ref.addEventListener("touchmove", onTouchMove, non_passive_event);
    carousel_ref.addEventListener("touchend", onTouchEnd);
    drag_events.current = [onTouchMove, onTouchEnd];
  };

  // Obviously you would ideally have these just set to on the react component itself. However, I
  // was having issues where it was producing strange behavior where we couldn't disable scrolling.
  // Through .preventDefault() I have absolutely no idea why this was the case in react (maybe a
  // bug). But setting it through this mechanism works.
  useEffect(() => {
    if (!carousel_ref.current) {
      return;
    }

    const current_carousel_ref = carousel_ref.current;
    const touch_start_event_handler = (e: TouchEvent) =>
      down(current_carousel_ref, e);
    const touch_cancel_event_handler = (e: TouchEvent) =>
      up(current_carousel_ref, e);

    current_carousel_ref.addEventListener(
      "touchstart",
      touch_start_event_handler,
    );
    current_carousel_ref.addEventListener(
      "touchcancel",
      touch_cancel_event_handler,
    );

    return () => {
      if (!carousel_ref.current) {
        return;
      }

      const current_carousel_ref = carousel_ref.current;
      current_carousel_ref.removeEventListener(
        "touchstart",
        touch_start_event_handler,
      );
      current_carousel_ref.removeEventListener(
        "touchcancel",
        touch_cancel_event_handler,
      );
    };
  }, []);

  return transitioned_slide;
};
