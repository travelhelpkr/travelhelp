import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import EmailVerification from '../component/EmailVerification';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title', () => {
  it('has title', () => {
    const { getByRole } = render(<EmailVerification />);
    expect(getByRole('heading', { name: 'email.title' })).toBeInTheDocument();
  });
});

describe('Contents', () => {
  it('has title of content', () => {
    const { getByText } = render(<EmailVerification />);
    expect(getByText('email.title2')).toBeInTheDocument();
  })
  it('has descriptions about email verification', () => {
    render(<EmailVerification />);
    expect(document.querySelector('.verificationContent1')?.textContent).toBe('email.des1-1email.des1-2 ');
    expect(document.querySelector('.verificationContent2')?.textContent).toBe('email.des2');
    expect(document.querySelector('.verificationContent3')?.textContent).toBe('email.des3-1email.des3-2');
    expect(document.querySelector('.verificationContent4')?.textContent).toBe('email.des4');
  })
});

describe('Resend button', () => {
  it('has resend button', () => {
    const { getByText } = render(<EmailVerification />);
    const button = getByText('email.resendBtn');
    expect(button).toBeTruthy();
  })
  it('calls handleResendBtn function', () => {
    const handleResendBtn = jest.fn();
    const { getByText } = render(<EmailVerification onClick={handleResendBtn()}/>);
    const button = getByText('email.resendBtn');
    
    fireEvent.click(button);
    expect(handleResendBtn).toBeCalledTimes(1);
  })
})