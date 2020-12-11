import * as React from 'react';
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import Signup from '../component/Signup';

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title of the component', () => {
  it(`Title should be 'signup.signup'`, () => {
    render(<Signup />);
    expect(screen.getByRole('heading', { name: /signup.signup/i })).toBeInTheDocument();
  });
})

describe('Signin buttons with oauth', () => {
  it('Oauth Google button has correct url', () => {
    render(<Signup />);
    const signinWithGoogleBtn = document.querySelector('.googleBtn')?.getAttribute('href');
    expect(signinWithGoogleBtn).toBe('http://localhost:3355/api/auth/google');
  })
  it('Oauth Line button has correct url', () => {
    render(<Signup />);
    const signinWithLineBtn = document.querySelector('.lineBtn')?.getAttribute('href');
    expect(signinWithLineBtn).toBe('http://localhost:3355/api/auth/line');
  })
})

describe('Or', () => {
  it(`Text 'OR' should be rendered`, () => {
    const renderComponent = render(<Signup />);
    expect(renderComponent.getByText('signin.or')).toBeInTheDocument();
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
  it('Has inputs and a button', () => {
    const { inputEmail, inputPassword, inputConfirmPassword, inputName, inputPolicy, button } = setup();
    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(inputConfirmPassword).toBeTruthy();
    expect(inputName).toBeTruthy();
    expect(inputPolicy).toBeTruthy();
    expect(button).toBeTruthy();
  })
  it('Checks the changes of input', () => {
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
  it('Calls signUpBtnHandler fn', async () => {
    const { button } = setup();
    const promise = Promise.resolve();
    const signUpBtnHandler = jest.fn();
    render(<Signup onClick={signUpBtnHandler()} />);

    await fireEvent.click(button);
    await expect(signUpBtnHandler).toHaveBeenCalledTimes(1);

    await act(() => promise);
  })
  it('Shows privacy policy when clicked', async () => {
    const renderComponent = render(<Signup />);
    const policyBtn = renderComponent.getByText('signup.policy');

    await expect(policyBtn).toBeTruthy();
    await fireEvent.click(policyBtn);
    await expect(renderComponent.getByText('Policy of processing of personal information')).toBeInTheDocument();
  })
  // it('Calls handleLoginBtn fn with status 200', async () => {
  //   const { button } = setup();
  //   const promise = Promise.resolve();
  //   const mock = new MockAdapter(axios);

  //   const handleLoginBtn = jest.fn();
  //   const props = { email: 'test@gmail.com', password: '12345678' };
  //   render(<Signin {...props} onClick={handleLoginBtn()} />);
    
  //   await fireEvent.click(button);
  //   await mock.onPost('/api/users/signin').reply(200, props);
  //   axios.post('/api/users/signin').then(res => {
  //     console.log(res.data);
  //   })
  //   await act(() => promise);
  // })
})

describe('Go to signin btn', () => {
  it(`Checks redirect url when clicked 'signup.already'`, () => {
    const renderComponent = render(<Signup />);
    const goToSigninBtn = renderComponent.getByText('signup.already').getAttribute('href');
    expect(goToSigninBtn).toBe('/user/signin');
  })
})