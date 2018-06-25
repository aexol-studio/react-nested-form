import { style } from 'typestyle';

export const Tag = style({
  position: 'relative',
  marginBottom: 15
});

export const holderSelect = style({
  position: 'relative',
  cursor: 'pointer',
  fontSize: 14
});

export const holderValue = style({
  borderBottom: '1px solid #fff',
  boxSizing: 'border-box',
  color: '#000',
  padding: '0 35px 0 0',
  textAlign: 'left'
});

export const placeholderValue = style({
  padding: 15,
  paddingLeft: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  boxSizing: 'border-box',
  color: '#fff',
  textAlign: 'left',
  fontFamily: 'Roboto',
  fontWeight: 100,
  letterSpacing: 1.2
});

export const showValue = style({
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: 2,
  border: '1px solid #ccc',
  color: '#000',
  display: 'inline-block',
  lineHeight: 1.4,
  padding: '5px 15px',
  margin: '5px 5px 5px 0'
});

export const valueChosen = style({
  marginRight: 5
});

export const Delete = style({
  position: 'absolute',
  top: 0,
  right: 0,
  color: 'white',
  padding: '3px 5px'
});
