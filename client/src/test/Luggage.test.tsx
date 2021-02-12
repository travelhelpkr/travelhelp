import * as React from 'react';
import { render } from '@testing-library/react';
import Luggage from '../component/Luggage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title and descriptions', () => {
  it(`has title 'luggage.title'`, () => {
    const { getByText } = render(<Luggage />);
    expect(getByText('luggage.title')).toBeInTheDocument();
  });
  it(`has description 'luggage.description1'`, () => {
    const { getByText } = render(<Luggage />);
    expect(getByText('luggage.description1')).toBeInTheDocument();
  });
  it(`has description 'luggage.description2'`, () => {
    const { getByText } = render(<Luggage />);
    expect(getByText('luggage.description2')).toBeInTheDocument();
  });
})

describe('Table Titles', () => {
  it('renders title of Table ', () => {
    render(<Luggage />);
    const title = document.querySelector('.tableTitle')?.textContent;

    expect(title).toBe('luggage.tableTitle (KRW)');
  })
  it('renders title of Discount Table', () => {
    render(<Luggage />);
    const discountedTitle = document.querySelector('.tableTitleDiscounted')?.textContent;

    expect(discountedTitle).toBe('luggage.tableTitleDiscounted');
  })
})

describe('Contents of Price Table', () => {
  const prices: any = {
    smallSize: [ '2,000', '3,000', '4,000', '4,000+3,000' ],
    mediumSize: [ '3,000', '4,500', '6,000', '6,000+4,000' ],
    largeSize: [ '4,000', '6,000', '8,000', '8,000+5,000' ]
  }
  function PriceTable (prices: any) {
    <table>
      <thead>
        <tr>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {prices.smallSize.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.mediumSize.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.largeSize.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  it('has head title of table', () => {
    render(<Luggage />);
    expect(document.querySelector('.priceTableTHead1')?.textContent).toBe('~4 luggage.hour');
    expect(document.querySelector('.priceTableTHead2')?.textContent).toBe('~8 luggage.hour');
    expect(document.querySelector('.priceTableTHead3')?.textContent).toBe('1 luggage.day');
    expect(document.querySelector('.priceTableTHead4')?.textContent).toBe('2 ~ 10 luggage.day');
  })
  it('renders every heads of the columns in the price table', () => {
    render(<Luggage />);
    expect(document.querySelector('.priceTableSecondColumn')?.textContent).toBe('luggage.small(~19 inch)');
    expect(document.querySelector('.priceTableThirdColumn')?.textContent).toBe('luggage.medium(20~29 inch)');
    expect(document.querySelector('.priceTableFourthColumn')?.textContent).toBe('luggage.large(30 inch ~)');
  })
  it('renders every rows in the price table', () => {
    render(<Luggage {...prices}/>);
    expect(document.querySelectorAll('.priceTableSecondRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.priceTableSecondRowPrice').length).toBe(4);
    expect(document.querySelectorAll('.priceTableThirdRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.priceTableThirdRowPrice').length).toBe(4);
    expect(document.querySelectorAll('.priceTableFourthRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.priceTableFourthRowPrice').length).toBe(4);
  })
})

describe('Contents of Discounted Table', () => {
  const prices: any = {
    smallSize: [ '1,000', '2,000', '3,000', '3,000+2,000' ],
    mediumSize: [ '2,000', '3,000', '4,000', '4,000+3,000' ],
    largeSize: [ '3,000', '4,000', '5,000', '5,000+4,000' ]
  }
  function PriceTable (prices: any) {
    <table>
      <thead>
        <tr>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {prices.smallSize.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.mediumSize.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.largeSize.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  it('has head title of table', () => {
    render(<Luggage />);
    expect(document.querySelector('.discountedTableTHead1')?.textContent).toBe('~4 luggage.hour');
    expect(document.querySelector('.discountedTableTHead2')?.textContent).toBe('~8 luggage.hour');
    expect(document.querySelector('.discountedTableTHead3')?.textContent).toBe('1 luggage.day');
    expect(document.querySelector('.discountedTableTHead4')?.textContent).toBe('2 ~ 10 luggage.day');
  })
  it('renders every heads of the columns in the discounted table', () => {
    render(<Luggage />);
    expect(document.querySelector('.discountedSecondColumn')?.textContent).toBe('luggage.small(~19 inch)');
    expect(document.querySelector('.discountedThirdColumn')?.textContent).toBe('luggage.medium(20~29 inch)');
    expect(document.querySelector('.discountedFourthColumn')?.textContent).toBe('luggage.large(30 inch ~)');
  })
  it('renders every rows in the discounted table', () => {
    render(<Luggage {...prices}/>);
    expect(document.querySelectorAll('.discountedTableSecondRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.discountedTableSecondRowPrice').length).toBe(4);
    expect(document.querySelectorAll('.discountedTableThirdRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.discountedTableThirdRowPrice').length).toBe(4);
    expect(document.querySelectorAll('.discountedTableFourthRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.discountedTableFourthRowPrice').length).toBe(4);
  })
})

describe('Size Image', () => {
  it('has image of size guideline', () => {
    render(<Luggage />);
    const imageSource = document.querySelector('.sizeImg')?.getAttribute('src');
    const imageAlt = document.querySelector('.sizeImg')?.getAttribute('alt');

    expect(imageAlt).toBe('sizeImg');
    expect(imageSource).toBe('size_guideline.jpg');
  })
})

describe('Size Information Lists', () => {
  it('has 6 lists of size information', () => {
    const { container } = render(<Luggage />);
    expect(container.querySelectorAll('.sizeInfoList').length).toEqual(6);
  })
  it('has 3 lists of size detail information', () => {
    const { container } = render(<Luggage />);
    expect(container.querySelectorAll('.sizeInfoListDetail').length).toEqual(3);
  })
})