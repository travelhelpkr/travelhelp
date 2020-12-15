import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ModalResetPassword from '../component/ModalResetPassword';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

const IPropsModalResetPassword = {
  isOpen: Boolean,
  setModal: Boolean
};

const setup = (props = {}) => {
  const setupProps = { ...IPropsModalResetPassword, props };
  const renderComponent = render(<ModalResetPassword {...setupProps} />);
  const { getByText, getByLabelText } = renderComponent;
  const inputEmail = getByLabelText('emailAddress');
  const button = getByText('resetPassword.btn');
  return {
    ...renderComponent,
    inputEmail,
    button
  }
};

describe('Modal close button', () => {
  it('closes modal when close btn is clicked', () => {
    const { getAllByRole } = setup();
    const closeBtn = getAllByRole('button')[0]

    expect(closeBtn).toBeTruthy();
  });
})

describe('Modal title and explanation', () => {
  it('checks correct title is rendered', () => {
    const { getByText } = setup();
    expect(getByText('signin.forgotPassword')).toBeInTheDocument();
  })
  it('checks correct explanation is rendered', () => {
    const { getByText } = setup();
    expect(getByText('resetPassword.step1')).toBeInTheDocument();
  })
  it('checks correct label is rendered', () => {
    const { getByText } = setup();
    expect(getByText('resetPassword.email')).toBeInTheDocument();
  })
})

describe('Email Address Form', () => {
  it('has input and a button', () => {
    const { inputEmail, button } = setup();

    expect(inputEmail).toBeTruthy();
    expect(button).toBeTruthy();
  })
  it('check the changes of input', () => {
    const { inputEmail } = setup();

    fireEvent.change(inputEmail, {
      target: {
        value: 'test@gmail.com'
      }
    });
    expect(inputEmail).toHaveAttribute('value', 'test@gmail.com');
  })
  it('calls handleResetPasswordBtn fn', () => {
    const { button } = setup();
    const handleResetPasswordBtn = jest.fn();
    render(<ModalResetPassword onClick={handleResetPasswordBtn()} />);

    fireEvent.click(button);
    expect(handleResetPasswordBtn).toHaveBeenCalledTimes(1);
  })
})
