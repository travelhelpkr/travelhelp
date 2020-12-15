import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Signup from '../component/Signup';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title of the component', () => {
  it(`has title of 'signup.signup'`, () => {
    const { getByRole } = render(<Signup />);
    expect(getByRole('heading', { name: /signup.signup/i })).toBeInTheDocument();
  });
})

describe('Signin buttons with oauth', () => {
  it('has correct url of oauth Google button', () => {
    render(<Signup />);
    const signinWithGoogleBtn = document.querySelector('.googleBtn')?.getAttribute('href');

    expect(signinWithGoogleBtn).toBe('http://localhost:3355/api/auth/google');
  })
  it('has correct url of oauth Line button', () => {
    render(<Signup />);
    const signinWithLineBtn = document.querySelector('.lineBtn')?.getAttribute('href');

    expect(signinWithLineBtn).toBe('http://localhost:3355/api/auth/line');
  })
})

describe('Or', () => {
  it(`has text 'OR'`, () => {
    const { getByText } = render(<Signup />);
    expect(getByText('signin.or')).toBeInTheDocument();
  })
})

describe('Signin Form', () => {
  const setup = () => {
    const renderComponent = render(<Signup />);
    const { getAllByText, getByLabelText } = renderComponent;
    const inputEmail = getByLabelText('emailAddressInput');
    const inputPassword = getByLabelText('passwordInput');
    const inputConfirmPassword = getByLabelText('confirmPasswordInput');
    const inputName = getByLabelText('nameInput');
    const inputPolicy = getByLabelText('policyInput');
    const button = getAllByText('signup.signup')[1];
    return {
      ...renderComponent,
      inputEmail,
      inputPassword,
      inputConfirmPassword,
      inputName,
      inputPolicy,
      button
    };
  };
  it('has inputs and a button', () => {
    const { inputEmail, inputPassword, inputConfirmPassword, inputName, inputPolicy, button } = setup();

    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(inputConfirmPassword).toBeTruthy();
    expect(inputName).toBeTruthy();
    expect(inputPolicy).toBeTruthy();
    expect(button).toBeTruthy();
  })
  it('checks the changes of input', () => {
    const { inputEmail, inputPassword, inputConfirmPassword, inputName, inputPolicy } = setup();

    fireEvent.change(inputEmail, {
      target: {
        value: 'test123@gmail.com'
      }
    });
    fireEvent.change(inputPassword, {
      target: {
        value: '1234'
      }
    });
    fireEvent.change(inputConfirmPassword, {
      target: {
        value: '1234'
      }
    });
    fireEvent.change(inputName, {
      target: {
        value: 'test user'
      }
    });
    fireEvent.change(inputPolicy, {
      target: {
        value: 'true'
      }
    });
    expect(inputEmail).toHaveAttribute('value', 'test123@gmail.com');
    expect(inputPassword).toHaveAttribute('value', '1234');
    expect(inputConfirmPassword).toHaveAttribute('value', '1234');
    expect(inputName).toHaveAttribute('value', 'test user');
    expect(inputPolicy).toHaveAttribute('value', 'true');
  })
  it('calls signUpBtnHandler fn', () => {
    const { button } = setup();
    const signUpBtnHandler = jest.fn();
    render(<Signup onClick={signUpBtnHandler()} />);

    fireEvent.click(button);
    expect(signUpBtnHandler).toHaveBeenCalledTimes(1);
  })
  it('shows privacy policy when clicked', () => {
    const { getByText } = render(<Signup />);
    const policyBtn = getByText('signup.policy');

    expect(policyBtn).toBeTruthy();
    fireEvent.click(policyBtn);
    expect(getByText('Policy of processing of personal information')).toBeInTheDocument();
  })
})

describe('Go to signin btn', () => {
  it(`checks redirect url when clicked 'signup.already'`, () => {
    const { getByText } = render(<Signup />);
    const goToSigninBtn = getByText('signup.already').getAttribute('href');
    
    expect(goToSigninBtn).toBe('/user/signin');
  })
})