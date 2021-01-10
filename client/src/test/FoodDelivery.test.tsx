import * as React from 'react';
import { render } from '@testing-library/react';
import FoodDelivery from '../component/FoodDelivery';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Pathname', () => {
  it('renders 2 components depends on the pathname', () => {
    render(<FoodDelivery />);
    expect(window.location.pathname).not.toBe('/help/foodDelivery/noodle');
  });
});

