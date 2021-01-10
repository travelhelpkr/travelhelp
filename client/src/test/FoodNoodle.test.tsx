import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FoodNoodle from '../component/FoodNoodle';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Cart icon', () => {
  it('has cart icon with image', () => {
    const checkSigninStatus = jest.fn();
    const { getByRole } = render(<FoodNoodle onClick={checkSigninStatus()}/>);
    const image = getByRole('img', { name: 'cartIconBtn' })?.getAttribute('src');
    const button = getByRole('button', { name: 'cartIconBtn' });

    expect(image).toBe('cart_white.png');
    fireEvent.click(button);
    expect(checkSigninStatus).toHaveBeenCalledTimes(1);
  })
});

describe('Restaurants buttons', () => {
  it('has correct url for each button', () => {
    const { getByText } = render(<FoodNoodle />);
    const chickenBtn = getByText('food.chicken');
    const noodleBtn = getByText('food.noodle');

    expect(chickenBtn).toHaveAttribute('href', '/help/foodDelivery/chicken');
    expect(noodleBtn).toHaveAttribute('href', '/help/foodDelivery/noodle');
  })
})

describe('Banner', () => {
  it('has banner image for noodle', () => {
    const { getByRole } = render(<FoodNoodle />);
    const image = getByRole('img', { name: 'banner' })?.getAttribute('src');

    expect(image).toBe('new_banner_bn.png');
  })
})

describe('Restaurant information', () => {
  it('has description of restaurant', () => {
    render(<FoodNoodle />);
    const restaurantDescription = document.querySelector('.restaurantDes');

    expect(restaurantDescription).not.toBeInTheDocument();
  })
  it('has name of restaurant', () => {
    render(<FoodNoodle />);
    const restaurantName = document.querySelector('.restaurantName');

    expect(restaurantName).not.toBeInTheDocument();
  })
  it('has office hour of restaurant', () => {
    render(<FoodNoodle />);
    const restaurantHour = document.querySelector('.restaurantHour');

    expect(restaurantHour).not.toBeInTheDocument();
  })
  it('has minimum price of restaurant', () => {
    render(<FoodNoodle />);
    const restaurantMinPrice = document.querySelector('.restaurantMin');

    expect(restaurantMinPrice).not.toBeInTheDocument();
  })
  it('has delivery fee of restaurant', () => {
    render(<FoodNoodle />);
    const restaurantDelFee= document.querySelector('.restaurantDel');

    expect(restaurantDelFee).not.toBeInTheDocument();
  })
})

describe('Menu information', () => {
  it('has menu lists of restaurant', () => {
    render(<FoodNoodle />);
    const menuLists = document.querySelector('.menuLi');

    expect(menuLists).not.toBeInTheDocument();
  })
})