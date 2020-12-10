import * as React from 'react';
import { render } from '@testing-library/react';
import Luggage from '../component/Luggage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title and descriptions', () => {
  it(`Title should be 'luggage.title'`, () => {
    const renderComponent = render(<Luggage />);
    expect(renderComponent.getByText('luggage.title')).toBeInTheDocument();
  });
  it(`Description should be 'luggage.description1'`, () => {
    const renderComponent = render(<Luggage />);
    expect(renderComponent.getByText('luggage.description1')).toBeInTheDocument();
  });
  it(`Description should be 'luggage.description2'`, () => {
    const renderComponent = render(<Luggage />);
    expect(renderComponent.getByText('luggage.description2')).toBeInTheDocument();
  });
})

describe('Table Titles', () => {
  it('Table title should be rendered', () => {
    render(<Luggage />);
    expect(document.querySelector('.tableTitle')?.textContent).toBe('luggage.tableTitle (KRW)');
  })
  it('Discount Table title should be rendered', () => {
    render(<Luggage />);
    expect(document.querySelector('.tableTitleDiscounted')?.textContent).toBe('luggage.tableTitleDiscounted');
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
  it('table head title', () => {
    render(<Luggage />);
    expect(document.querySelector('.priceTableTHead1')?.textContent).toBe('~4 luggage.hour');
    expect(document.querySelector('.priceTableTHead2')?.textContent).toBe('~8 luggage.hour');
    expect(document.querySelector('.priceTableTHead3')?.textContent).toBe('1 luggage.day');
    expect(document.querySelector('.priceTableTHead4')?.textContent).toBe('2 ~ 10 luggage.day');
  })
  it('Every heads of the columns in the price table should be rendered', () => {
    render(<Luggage />);
    expect(document.querySelector('.priceTableSecondColumn')?.textContent).toBe('luggage.small(~19 inch)');
    expect(document.querySelector('.priceTableThirdColumn')?.textContent).toBe('luggage.medium(20~29 inch)');
    expect(document.querySelector('.priceTableFourthColumn')?.textContent).toBe('luggage.large(30 inch ~)');
  })
  it('Every rows in the price table should be rendered', () => {
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
  it('table head title', () => {
    render(<Luggage />);
    expect(document.querySelector('.discountedTableTHead1')?.textContent).toBe('~4 luggage.hour');
    expect(document.querySelector('.discountedTableTHead2')?.textContent).toBe('~8 luggage.hour');
    expect(document.querySelector('.discountedTableTHead3')?.textContent).toBe('1 luggage.day');
    expect(document.querySelector('.discountedTableTHead4')?.textContent).toBe('2 ~ 10 luggage.day');
  })
  it('Every heads of the columns in the discounted table should be rendered', () => {
    render(<Luggage />);
    expect(document.querySelector('.discountedSecondColumn')?.textContent).toBe('luggage.small(~19 inch)');
    expect(document.querySelector('.discountedThirdColumn')?.textContent).toBe('luggage.medium(20~29 inch)');
    expect(document.querySelector('.discountedFourthColumn')?.textContent).toBe('luggage.large(30 inch ~)');
  })
  it('Every rows in the discounted table should be rendered', () => {
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
  it('Size Guideline Image has src and alt', () => {
    render(<Luggage />);
    const imageSource = document.querySelector('.sizeImg')?.getAttribute('src');
    const imageAlt = document.querySelector('.sizeImg')?.getAttribute('alt');
    expect(imageAlt).toBe('sizeImg');
    expect(imageSource).toBe('size_guideline.jpg');
  })
})

describe('Size Information Lists', () => {
  it('6 Lists of size information should be rendered', () => {
    const { container } = render(<Luggage />);
    expect(container.querySelectorAll('.sizeInfoList').length).toEqual(6);
  })
  it('3 Lists of size detail information should be rendered', () => {
    const { container } = render(<Luggage />);
    expect(container.querySelectorAll('.sizeInfoListDetail').length).toEqual(3);
  })
})