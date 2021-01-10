import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ModalChicken from '../component/ModalChicken';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

const IPropsModalChicken = {
  isOpen: Boolean,
  setModal: Boolean,
  infoMenuId: Number,
  infoImage: String,
  infoName: String,
  infoPrice: Number,
  infoDescription: String,
  infoOptionName1: String,
  infoOptionName2: String,
  infoOptionPrice2: Number,
  setSuccess: Boolean,
  success: Boolean,
  setFailure: Boolean,
  failure: Boolean,
  setOptionError: Boolean,
  optionError: Boolean,
  setOtherRestaurant: Boolean,
  otherRestaurant: Boolean
};

const setup = (props = {}) => {
  const setupProps = { ...IPropsModalChicken, props };
  return render(<ModalChicken {...setupProps} />);
};

describe('Modal close button', () => {
  it('closes modal when close btn is clicked', () => {
    const { getByRole } = setup();
    const closeBtn = getByRole('button', { name: '' });

    fireEvent.click(closeBtn);
  });
})

describe('Menu Information', () => {
  it('has menu image', () => {
    const { getByRole } = setup();
    const menuImage = getByRole('img', { name: 'modalMenuImage' });

    expect(menuImage).toBeInTheDocument();
  })
  it('has menu name', () => {
    const { container } = setup();
    const menuName = container.querySelector('.modalMenuName');

    expect(menuName).toBeInTheDocument();
  })
  it('has menu description', () => {
    const { container } = setup();
    const menuDescription = container.querySelector('.modalMenuDes');

    expect(menuDescription).toBeInTheDocument();
  })
  it('has menu price', () => {
    const { container } = setup();
    const menuPrice = container.querySelector('.modalMenuPrice');

    expect(menuPrice).toBeInTheDocument();
  })
})

describe('Select box', () => {
  it('has menu option or not', () => {
    const { container } = setup();
    const option1 = container.querySelector('.option1');
    const option2 = container.querySelector('.option2');

    expect(option1).not.toBeInTheDocument();
    expect(option2).not.toBeInTheDocument();
  })
  it('has select box of menu option', () => {
    const { container } = setup();
    const selectBox = container.querySelector('select');

    expect(selectBox).toBeInTheDocument();
  })
})

describe('Add to Cart button', () => {
  it('has button to add', () => {
    const addToCartHandler = jest.fn();
    const { getByText } = render(<ModalChicken {...IPropsModalChicken} onClick={addToCartHandler()}/>);
    const button = getByText('modalChicken.addToCart');

    fireEvent.click(button);
    expect(addToCartHandler).toHaveBeenCalledTimes(1);
  })
})