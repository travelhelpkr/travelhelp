import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ModalSignin from '../component/ModalSignin';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

const IPropsModalSignin = {
  isSignin: Boolean,
  setIsSignin: Boolean
};

const setup = (props = {}) => {
  const setupProps = { ...IPropsModalSignin, props };
  return render(<ModalSignin {...setupProps} />);
};

describe('Modal close button', () => {
  it('closes modal when close btn is clicked', () => {
    const { getByRole } = setup();
    const closeBtn = getByRole('button', { name: '' });

    fireEvent.click(closeBtn);
  });
})

describe('Signin alert message', () => {
  it('has title and content of message', () => {
    const { getByText } = setup();
    const title = getByText('modalSignin.signin1');
    const content = getByText(':) modalSignin.signin2');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  })
})

describe('Okay button', () => {
  it('has okay button', () => {
    const goToSigninHandler = jest.fn();
    const { getByText } = render(<ModalSignin {...IPropsModalSignin} onClick={goToSigninHandler()}/>);
    const button = getByText('Okay');

    fireEvent.click(button);
    expect(goToSigninHandler).toHaveBeenCalledTimes(1);
  })
})