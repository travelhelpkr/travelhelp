import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Signin from '../component/Signin';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title of the component', () => {
  it(`has title of 'signin.signin'`, () => {
    const { getByRole } = render(<Signin />);
    expect(getByRole('heading', { name: /signin.signin/i })).toBeInTheDocument();
  });
})

describe('Signin buttons with oauth', () => {
  it('has correct url of oauth Google button', () => {
    render(<Signin />);
    const signinWithGoogleBtn = document.querySelector('.googleBtn')?.getAttribute('href');

    expect(signinWithGoogleBtn).toBe('http://localhost:3355/api/auth/google');
  })
  it('has correct url of oauth Line button', () => {
    render(<Signin />);
    const signinWithLineBtn = document.querySelector('.lineBtn')?.getAttribute('href');

    expect(signinWithLineBtn).toBe('http://localhost:3355/api/auth/line');
  })
})

describe('Or', () => {
  it(`renders text 'OR'`, () => {
    const { getByText } = render(<Signin />);
    expect(getByText('signin.or')).toBeInTheDocument();
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
  it('has inputs and a button', () => {
    const { inputEmail, inputPassword, button } = setup();

    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(button).toBeTruthy();
  })
  it('check the changes of input', () => {
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
  it('calls handleLoginBtn fn', () => {
    const { button } = setup();
    const handleLoginBtn = jest.fn();
    render(<Signin onClick={handleLoginBtn()} />);

    fireEvent.click(button);
    expect(handleLoginBtn).toHaveBeenCalledTimes(1);
  })
})

describe('Find password and go to signup', () => {
  it('opens modal for finding password', () => {
    const { getAllByText } = render(<Signin />);
    const findPasswordBtn = getAllByText('signin.forgotPassword')[0];

    expect(findPasswordBtn).toBeTruthy();
    fireEvent.click(findPasswordBtn);
    expect(getAllByText('signin.forgotPassword')[1]).toBeInTheDocument();
  });
  it(`checks redirect url when clicked 'signin.gotoSignUp'`, () => {
    const { getByText } = render(<Signin />);
    const goToSignupBtn = getByText('signin.gotoSignUp').getAttribute('href');

    expect(goToSignupBtn).toBe('/user/signup');
  })
})