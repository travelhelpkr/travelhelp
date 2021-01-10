import * as React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Home from '../component/Home';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Select Box of language', () => {
  it('changes language to English', () => {
    const { container, getAllByText } = render(<Home />);
    fireEvent.change(container.getElementsByClassName("selectLanguage")[0], {
      target: { value: "en" },
    });
    expect(getAllByText('English')[0]).toBeInTheDocument();
  });
  it('changes language to Chinese', () => {
    const { container, getByText } = render(<Home />);
    fireEvent.change(container.getElementsByClassName("selectLanguage")[1], {
      target: { value: "zh" },
    });
    expect(getByText('中文')).toBeInTheDocument();
  });
  it('changes language to Japanese', () => {
    const { container, getByText } = render(<Home />);
    fireEvent.change(container.getElementsByClassName("selectLanguage")[2], {
      target: { value: "ja" },
    });
    expect(getByText('日本語')).toBeInTheDocument();
  });
})

describe('4 menus', () => {
  const { container } = render(<Home />);
  it('checks home component has a food delivery menu', () => {
    container.getElementsByClassName("foodDelivery");
  });
  it('checks home component has a luggage menu', () => {
    container.getElementsByClassName("luggage");
  });
  it('checks home component has a taxi menu', () => {
    container.getElementsByClassName("taxi");
  });
  it('checks home component has a rental menu', () => {
    container.getElementsByClassName("rental");
  });
});

describe('Correct url', () => {
  it('checks food delivery has correct url', () => {
    render(<Home />);
    const foodDeliveryBtn = document.querySelector('.foodDelivery')?.getAttribute('href');
    expect(foodDeliveryBtn).toBe('/help/foodDelivery');
  });
  it('checks luggage has correct url', () => {
    render(<Home />);
    const luggageBtn = document.querySelector('.luggage')?.getAttribute('href');
    expect(luggageBtn).toBe('/help/luggage');
  });
  it('checks taxi has correct url', () => {
    render(<Home />);
    const taxiBtn = document.querySelector('.taxi')?.getAttribute('href');
    expect(taxiBtn).toBe('/help/taxi');
  });
  it('checks rental has correct url', () => {
    render(<Home />);
    const rentalBtn = document.querySelector('.rental')?.getAttribute('href');
    expect(rentalBtn).toBe('/help/rental');
  });
});
