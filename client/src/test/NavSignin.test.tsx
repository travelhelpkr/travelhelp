import * as React from 'react';
import { render } from '@testing-library/react';
import NavSignin from '../component/NavSignin';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title', () => {
  it('has title', () => {
    const { getByText } = render(<NavSignin />);
    expect(getByText('Travel Help')).toBeInTheDocument();
  });
  it('has correct url when clicked title', () => {
    const { getByText } = render(<NavSignin />);
    const title = getByText('Travel Help').getAttribute('href');
    expect(title).toBe('/');
  })
});

describe('SignIn Button', () => {
  it('has signin button in the Nav bar', () => {
    const { getByText } = render(<NavSignin />);
    expect(getByText('home.signin')).toBeInTheDocument();
  })
  it('has correct url when clicked signin button', () => {
    const { getByText } = render(<NavSignin />);
    const signinBtn = getByText('home.signin').getAttribute('href');
    expect(signinBtn).toBe('/user/signin');
  })
})

