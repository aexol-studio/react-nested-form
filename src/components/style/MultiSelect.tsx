import { style } from 'typestyle';
export const MultiSelect = style({
  position: 'relative',
});

export const holderSelect = style({
  position: 'relative',
  cursor: 'pointer',
  fontSize: 14,
});

export const SelectArrow = style({
  borderColor: ' #999 transparent transparent',
  borderStyle: 'solid',
  borderWidth: '5px 5px 2.5px',
  height: 0,
  width: 0,
  position: 'absolute',
  right: 20,
  top: '50%',
  transform: 'translate(0, -50%)',
});
export const holderValue = style({
  border: '1px solid #d9d9d9',
  boxSizing: 'border-box',
  padding: '0 35px 0 5px',
});

export const placeholderValue = style({
  padding: '5px 15px',
  width: '100%',
  height: '100%',
  display: 'block',
  boxSizing: 'border-box',
  color: '#888',
  border: 0,
  outline: 0,
});

export const showValue = style({
  position: 'relative',
  backgroundColor: '#ddd',
  borderRadius: 2,
  border: '1px solid #666',
  color: '#666',
  display: 'inline-block',
  lineHeight: 1.4,
  padding: '5px 15px',
  margin: '5px 5px 5px 0',
});

export const emptyValue = style({
  border: 0,
});
export const valueChoosen = style({
  marginRight: 5,
});
export const Delete = style({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '3px 5px',
});

export const holderValues = style({
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  border: '1px solid #d9d9d9',
  borderTop: 0,
  cursor: 'pointer',
  maxHeight: 160,
  overflowY: 'auto',
  position: 'absolute',
  background: '#fff',
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  zIndex: 8,
});
export const Li = style({
  padding: '10px 15px',
  boxSizing: 'border-box',
  transition: '0.35 ease-out',
  color: 'inherit',
  $nest: {
    '&:hover': {
      background: '#ccc',
      color: '#fff',
    },
  },
});
export const open = style({
  display: 'block',
});
export const Change = style({
  $nest: {
    SelectArrow: {
      top: '30%',
      transform: 'rotate(180deg) translate(0, -50%)',
    },
  },
});
