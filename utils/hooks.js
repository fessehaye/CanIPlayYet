import { useEffect } from 'react';
import anime from 'animejs';

export function useMsgAnimations(myRef, steps = false) {
  useEffect(() => {
    anime({
      targets: myRef.current,
      rotateY: [-60, 0],
      opacity: [0, 1],
      transformStyle: 'preserve-3d',
      duration: 500,
      delay: 500,
      easing: 'easeInOutQuad',
    });

    if (steps) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750,
        delay: 1000,
      });

      tl.add({
        targets: '.step-1',
        opacity: [0, 1],
      })
        .add({
          targets: '.step-2',
          opacity: [0, 1],
        })
        .add({
          targets: '.step-3',
          opacity: [0, 1],
        })
        .add({
          targets: '.step-4',
          opacity: [0, 1],
        });
    }

    return () => {
      anime({
        targets: myRef.current,
        rotateY: [0, -180],
        opacity: [1, 0],
        transformStyle: 'preserve-3d',
        duration: 500,
        easing: 'easeInOutQuad',
      });
    };
  }, [myRef, steps]);

  return null;
}

export const Actions = {
  UPDATE_SLUG : "UPDATE_SLUG",
  UPDATE_SETUP : "UPDATE_SETUP",
  UPDATE_LOOP : "UPDATE_LOOP",
  UPDATE_RESULT : "UPDATE_RESULT",
  TOGGLE_LOADING : "TOGGLE_LOADING",
  START_TOUR : "START_TOUR",
  STOP_TOUR : "STOP_TOUR"
}

export function reducer(state, action) {
  switch (action.type) {
    case Actions.UPDATE_SETUP:
      return {...state, setups: action.payload, result : null};
    case Actions.UPDATE_SLUG:
      return {...state,slug : action.payload, result : null};
    case Actions.UPDATE_LOOP:
      return {...state, loop: !state.loop, result : null};
    case Actions.UPDATE_RESULT:
      return {...state, result: action.payload, loading: false};
    case Actions.TOGGLE_LOADING:
      return {...state,loading: !state.loading };
    case Actions.START_TOUR:
      return {...state, isTourOpen: true, slug: "caniplayexample", setups: 6 };
    case Actions.STOP_TOUR:
      return {...state, isTourOpen:false }
    default:
      throw new Error("Action doesn't exist");
  }
}
