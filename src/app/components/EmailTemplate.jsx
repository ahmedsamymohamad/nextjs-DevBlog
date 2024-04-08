import * as React from 'react';


export const EmailTemplate = ({
  email,
  message
}) => (
  <div className='flex flex-col'>
    <h4>from: {email}</h4>
    <p>{message}</p>
  </div>
);
