import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

it('checks the channelTalk button clicked', () => {
  const { getByRole } = render(<App />);
  const button = getByRole('button', { name: '' });

  fireEvent.click(button);
});
