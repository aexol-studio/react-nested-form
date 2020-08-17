import { style } from 'typestyle';
export const OptionContainer = style({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '5px 0',
});

export const Option = style({
  marginRight: 5,
  marginBottom: 5,
  padding: '5px 10px',
  border: '1px solid black',
  color: 'black',
  backgroundColor: 'white',
  cursor: 'pointer',
  $nest: {
      '&.active': {
        border: '1px solid blue',
      }
  }
});

export const PrefferedOptionsContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
})

export const ShowMoreButton = style({
    margin: '5px 0',
})
