import * as React from 'react';
import { fireEvent, render, cleanup, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import ModalResetPassword from '../component/ModalResetPassword';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Modal close button', () => {
  it('Closes modal when close btn is clicked', () => {
    const { getAllByRole } = render(<ModalResetPassword isOpen setModal/>);
    const closeBtn = getAllByRole('button')[0]

    expect(closeBtn).toBeTruthy();
  });
})

describe('Modal title and explanation', () => {
  it('Checks correct title is rendered', () => {
    const { getByText } = render(<ModalResetPassword isOpen setModal/>);
    expect(getByText('signin.forgotPassword')).toBeInTheDocument();
  })
  it('Checks correct explanation is rendered', () => {
    const { getByText } = render(<ModalResetPassword isOpen setModal/>);
    expect(getByText('resetPassword.step1')).toBeInTheDocument();
  })
  it('Checks correct label is rendered', () => {
    const { getByText } = render(<ModalResetPassword isOpen setModal/>);
    expect(getByText('resetPassword.email')).toBeInTheDocument();
  })
})

describe('Email Address Form', () => {
  const setup = () => {
    const renderComponent = render(<ModalResetPassword isOpen setModal />);
    const { getByText, getByLabelText } = renderComponent;
    const inputEmail = getByLabelText('emailAddress');
    const button = getByText('resetPassword.btn');
    return {
      ...renderComponent,
      inputEmail,
      button
    };
  };
  it('Has input and a button', () => {
    const { inputEmail, button } = setup();
    expect(inputEmail).toBeTruthy();
    expect(button).toBeTruthy();
  })
  it('Check the changes of input', () => {
    const { inputEmail } = setup();
    fireEvent.change(inputEmail, {
      target: {
        value: 'test@gmail.com'
      }
    });
    expect(inputEmail).toHaveAttribute('value', 'test@gmail.com');
  })
  it('Calls handleResetPasswordBtn fn', async () => {
    const { button } = setup();
    const promise = Promise.resolve();
    const handleResetPasswordBtn = jest.fn();
    render(<ModalResetPassword onClick={handleResetPasswordBtn()} />);

    await fireEvent.click(button);
    await expect(handleResetPasswordBtn).toHaveBeenCalledTimes(1);

    await act(() => promise);
  })
})
