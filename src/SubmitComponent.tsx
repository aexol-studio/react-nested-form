import * as React from 'react';

const SubmitComponent = ({ submitText, onClick }) => (
  <button className="Submit" type="submit" onClick={onClick}>
    {submitText}
  </button>
);
export default SubmitComponent;
