import * as React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('checks the channelTalk button clicked', () => {
  const utils = render(<App />);
  utils.container.getElementsByClassName("channelTalkIcon");
});
