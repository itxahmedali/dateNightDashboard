import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const headerAnimation = trigger('animateText', [
  state(
    'hidden',
    style({
      opacity: 0,
    })
  ),
  state(
    'visible',
    style({
      opacity: 1,
    })
  ),
  transition('hidden <=> visible', [animate('0.3s ease')]),
]);
