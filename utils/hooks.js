import React, { useEffect } from 'react';
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
			var tl = anime.timeline({ easing: 'easeOutExpo', duration: 750, delay: 1000 });

			tl
				.add({
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
	}, []);

	return null;
}
