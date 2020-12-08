import * as React from 'react';
import { screen, render, getByTestId, fireEvent } from '@testing-library/react';
import Home from '../component/Home';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('change language', () => {
  it('change language to English', () => {
    const renderComponent = render(<Home />);
    fireEvent.change(renderComponent.container.getElementsByClassName("selectLanguage")[0], {
      target: { value: "en" },
    });
    expect(screen.getAllByText('English')[0]).toBeInTheDocument();
  });
  it('change language to Chinese', () => {
    const renderComponent = render(<Home />);
    fireEvent.change(renderComponent.container.getElementsByClassName("selectLanguage")[1], {
      target: { value: "zh" },
    });
    expect(screen.getByText('中文')).toBeInTheDocument();
  });
  it('change language to Japanese', () => {
    const renderComponent = render(<Home />);
    fireEvent.change(renderComponent.container.getElementsByClassName("selectLanguage")[2], {
      target: { value: "ja" },
    });
    expect(screen.getByText('日本語')).toBeInTheDocument();
  });
})

describe('4 menus', () => {
  const renderComponent = render(<Home />);
  it('checks home component has a food delivery menu', () => {
    renderComponent.container.getElementsByClassName("foodDelivery");
  });
  it('checks home component has a luggage menu', () => {
    renderComponent.container.getElementsByClassName("luggage");
  });
  it('checks home component has a taxi menu', () => {
    renderComponent.container.getElementsByClassName("taxi");
  });
  it('checks home component has a rental menu', () => {
    renderComponent.container.getElementsByClassName("rental");
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
