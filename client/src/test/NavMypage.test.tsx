import * as React from 'react';
import { render } from '@testing-library/react';
import NavMypage from '../component/NavMypage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title', () => {
  it('has title', () => {
    const { getByText } = render(<NavMypage />);
    expect(getByText('Travel Help')).toBeInTheDocument();
  });
  it('has correct url when clicked title', () => {
    const { getByText } = render(<NavMypage />);
    const title = getByText('Travel Help').getAttribute('href');
    expect(title).toBe('/');
  })
});

describe('Mypage Button', () => {
  it('has mypage button in the Nav bar', () => {
    const { getByText } = render(<NavMypage />);
    expect(getByText('nav.mypage')).toBeInTheDocument();
  })
  it('has correct url when clicked mypage button', () => {
    const { getByText } = render(<NavMypage />);
    const mypageBtn = getByText('nav.mypage').getAttribute('href');
    expect(mypageBtn).toBe('/user/mypage');
  })
})

