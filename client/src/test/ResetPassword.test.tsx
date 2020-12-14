import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ResetPassword from '../component/ResetPassword';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title', () => {
  it('has title', () => {
    const { getByRole } = render(<ResetPassword />);
    expect(getByRole('heading', { name: 'resetPassword.btn' })).toBeInTheDocument();
  });
});

describe('Form of user information', () => {
  it('has email address of user', () => {
    const { getByText } = render(<ResetPassword />);
    expect(getByText('resetPassword.email')).toBeInTheDocument();
  })
  it('has input titles', () => {
    const { getByText } = render(<ResetPassword />);
    expect(getByText('resetPassword.newPassword')).toBeInTheDocument();
    expect(getByText('resetPassword.confirmPassword')).toBeInTheDocument();
  })
  it('has input form', () => {
    const { getByPlaceholderText } = render(<ResetPassword />);
    const inputNewPassword = getByPlaceholderText('signup.password');
    const inputConfirmNewPassword = getByPlaceholderText('signup.confirmPassword');
    expect(inputNewPassword).toBeTruthy();
    expect(inputConfirmNewPassword).toBeTruthy();
  })
  it('changes input', () => {
    const { getByPlaceholderText } = render(<ResetPassword />);
    const inputNewPassword = getByPlaceholderText('signup.password');
    const inputConfirmNewPassword = getByPlaceholderText('signup.confirmPassword');
    fireEvent.change(inputNewPassword, {
      target: {
        value: '1234'
      }
    });
    fireEvent.change(inputConfirmNewPassword, {
      target: {
        value: '12345678'
      }
    });
    expect(inputNewPassword).toHaveAttribute('value', '1234');
    expect(inputConfirmNewPassword).toHaveAttribute('value', '12345678');
  })
  it('has reset password button', () => {
    const resetPasswordHandler = jest.fn();
    const { getAllByText } = render(<ResetPassword onClick={resetPasswordHandler()}/>);
    const button = getAllByText('resetPassword.btn')[1];

    fireEvent.click(button);
    expect(resetPasswordHandler).toHaveBeenCalledTimes(1);
  })
})