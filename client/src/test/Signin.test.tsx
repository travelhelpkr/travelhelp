import * as React from 'react';
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import Signin from '../component/Signin';

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title of the component', () => {
  it(`Title should be 'signin.signin'`, () => {
    render(<Signin />);
    expect(screen.getByRole('heading', { name: /signin.signin/i })).toBeInTheDocument();
  });
})

describe('Signin buttons with oauth', () => {
  it('Oauth Google button has correct url', () => {
    render(<Signin />);
    const signinWithGoogleBtn = document.querySelector('.googleBtn')?.getAttribute('href');
    expect(signinWithGoogleBtn).toBe('http://localhost:3355/api/auth/google');
  })
  it('Oauth Line button has correct url', () => {
    render(<Signin />);
    const signinWithLineBtn = document.querySelector('.lineBtn')?.getAttribute('href');
    expect(signinWithLineBtn).toBe('http://localhost:3355/api/auth/line');
  })
})

describe('Or', () => {
  it(`Text 'OR' should be rendered`, () => {
    const renderComponent = render(<Signin />);
    expect(renderComponent.getByText('signin.or')).toBeInTheDocument();
  })
})

describe('Signin Form', () => {
  const setup = (props = {}) => {
    const renderComponent = render(<Signin {...props} />);
    const { getAllByText, getByLabelText } = renderComponent;
    const inputEmail = getByLabelText('emailAddressInput');
    const inputPassword = getByLabelText('passwordInput');
    const button = getAllByText('signin.signin')[1];
    return {
      ...renderComponent,
      inputEmail,
      inputPassword,
      button
    };
  };
  it('Has inputs and a button', () => {
    const { inputEmail, inputPassword, button } = setup();
    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(button).toBeTruthy();
  })
  it('Check the changes of input', () => {
    const { inputEmail, inputPassword } = setup();
    fireEvent.change(inputEmail, {
      target: {
        value: 'test@gmail.com'
      }
    });
    fireEvent.change(inputPassword, {
      target: {
        value: 'test1234'
      }
    });
    expect(inputEmail).toHaveAttribute('value', 'test@gmail.com');
    expect(inputPassword).toHaveAttribute('value', 'test1234');
  })
  it('Calls handleLoginBtn fn', async () => {
    const { button } = setup();
    const promise = Promise.resolve();
    const handleLoginBtn = jest.fn();
    render(<Signin onClick={handleLoginBtn()} />);

    await fireEvent.click(button);
    await expect(handleLoginBtn).toHaveBeenCalledTimes(1);

    await act(() => promise);
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

describe('Find password and go to signup', () => {
  it('Opens modal for finding password', async () => {
    const renderComponent = render(<Signin />);
    const findPasswordBtn = renderComponent.getAllByText('signin.forgotPassword')[0];

    await expect(findPasswordBtn).toBeTruthy();
    await fireEvent.click(findPasswordBtn);
    await expect(renderComponent.getAllByText('signin.forgotPassword')[1]).toBeInTheDocument();
  });
  it(`Checks redirect url when clicked 'signin.gotoSignUp'`, () => {
    const renderComponent = render(<Signin />);
    const goToSignupBtn = renderComponent.getByText('signin.gotoSignUp').getAttribute('href');
    expect(goToSignupBtn).toBe('/user/signup');
  })
})