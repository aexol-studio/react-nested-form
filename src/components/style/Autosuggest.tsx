import { style } from 'typestyle';

export const Autosuggest = style({
  position: 'relative',
});

export const datalistSuggest = style({
  position: 'absolute',
  background: '#fff',
  width: '100%',
  boxSizing: 'border-box',
  display: 'none',
  border: '1px solid #d9d9d9',
  borderTop: 'none',
  zIndex: 1,
});

export const showDataList = style({
  display: 'block',
});

export const optionsSuggest = style({
  padding: '8px 16px',
  cursor: 'pointer',
  zIndex: 2,
  transition: '0.35s ease-out',
  $nest: {
    '&:hover, &.active': {
      background: '#ccc',
      color: '#fff',
    },
  },
});
