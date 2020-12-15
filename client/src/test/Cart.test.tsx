import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Cart from '../component/Cart';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('GoBack button', () => {
  it('goes back when GoBack btn is clicked', () => {
    const goBackHandler = jest.fn();
    const { getByRole } = render(<Cart onClick={goBackHandler()}/>);
    const backBtn = getByRole('button', { name: '' });

    expect(backBtn).toBeInTheDocument();
  });
})

describe('Cart title', () => {
  it('has title', () => {
    const { getByText } = render(<Cart />);
    
    expect(getByText('cart.myCart')).toBeInTheDocument();
  })
})

describe('Cart table', () => {
  it('has head of table', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('cart.menu')).toBeInTheDocument();
    expect(getByText('cart.price')).toBeInTheDocument();
  })
  it('has restaurant name', () => {
    render(<Cart />);
    const restaurantName = document.querySelector('.neneChicken');

    expect(restaurantName).toBeInTheDocument();
  })
  it('renders minimum price', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('cart.minimum')).toBeInTheDocument();
  })
  it('renders menu list', () => {
    const { getByRole } = render(<Cart />);
    const menuList = getByRole('list', { name: '' });

    expect(menuList).toBeInTheDocument();
  })
})

describe('Summary information', () => {
  it('has total price of menu', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('cart.menuPrice')).toBeInTheDocument();
  })
  it('has deliver fee of restaurant', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('cart.delivery')).toBeInTheDocument();
  })
  it('has total price of delivery', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('cart.total')).toBeInTheDocument();
  })
})

describe('Delivery Information', () => {
  it('has title of delivery section', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('order.delivery')).toBeInTheDocument();
  })
  it('has title of delivery information', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('order.deliveryInformation')).toBeInTheDocument();
  })
  it('has button of recent address list', () => {
    const { getByText } = render(<Cart />);
    const recentAddressBtn = getByText('order.choose');

    expect(recentAddressBtn).toBeInTheDocument();
  })
  it('has select box', () => {
    const { container } = render(<Cart />);
    const selectBox = container.querySelector('select');

    expect(selectBox).toBeInTheDocument();
  })
  it(`has 'OR' text`, () => {
    const { getByText } = render(<Cart />);

    expect(getByText('signin.or')).toBeInTheDocument();
  })
  it('has form of delivery address', () => {
    const { getByPlaceholderText } = render(<Cart />);
    const inputPostalCode = getByPlaceholderText('order.postalCode');
    const inputAddress = getByPlaceholderText('order.deliveryAddress');
    const inputContact = getByPlaceholderText('order.contact');

    fireEvent.change(inputPostalCode, {
      target: {
        value: '02716'
      }
    })
    fireEvent.change(inputAddress, {
      target: {
        value: '1201, mapo-gu, seoul, Korea'
      }
    })
    fireEvent.change(inputContact, {
      target: {
        value: '01012345678'
      }
    })
    
    expect(inputPostalCode).toHaveAttribute('value', '02716');
    expect(inputAddress).toHaveAttribute('value', '1201, mapo-gu, seoul, Korea');
    expect(inputContact).toHaveAttribute('value', '01012345678');
  })
  it('has button of self address', () => {
    const { getByText } = render(<Cart />);
    const selfAddressBtn = getByText('order.myself');

    expect(selfAddressBtn).toBeInTheDocument();
  })
})

describe('Payment', () => {
  it('has payment btn', () => {
    const payBtnHandler = jest.fn();
    const { getByText } = render(<Cart onClick={payBtnHandler()}/>);
    const paymentBtn = getByText('order.pay');

    fireEvent.click(paymentBtn)
    expect(payBtnHandler).toHaveBeenCalledTimes(1);
  });
})