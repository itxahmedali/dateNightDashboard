import {animate, style, transition, trigger} from '@angular/animations';

const transitionIn = transition(':enter', [
    style({
        opacity: 0,
    }),
    animate(
        '0.6s ease-in',
        style({
            opacity: 1,
        }),
    ),
]);

const transitionOut = transition(':leave', [
    style({
        opacity: 1,
    }),
    animate(
        '0.6s ease-out',
        style({
            opacity: 0,
        }),
    ),
]);

export const fadeIn = trigger('fadeIn', [transitionIn]);

export const fadeOut = trigger('fadeOut', [transitionOut]);