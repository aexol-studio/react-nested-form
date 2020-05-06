import * as React from 'react';

export const SubmitComponent = ({
  submitText,
  onClick,
}: {
  submitText: string;
  onClick: (event: React.MouseEvent<any>) => void;
}) => (
  <button className="Submit" type="submit" onClick={onClick}>
    {submitText}
  </button>
);
