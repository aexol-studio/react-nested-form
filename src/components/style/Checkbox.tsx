import { style } from 'typestyle';

export const Checkbox = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
});

export const border = style({
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#dfdfdf',
});
export const tick = style({
  width: 16,
  height: 16,
  background: '#cecece',
});

export const checked = style({
  background: '#333',
});

export const Description = style({
  $nest: {
    '&.left': {
      marginRight: 10,
    },
    '&.right': {
      marginLeft: 10,
    },
  },
});
