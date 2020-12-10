import * as React from 'react';
import { render } from '@testing-library/react';
import Taxi from '../component/Taxi';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Title and descriptions', () => {
  it(`Title should be 'taxi.title'`, () => {
    const renderComponent = render(<Taxi />);
    expect(renderComponent.getByText('taxi.title')).toBeInTheDocument();
  });
  it(`Description should be 'taxi.description1'`, () => {
    const renderComponent = render(<Taxi />);
    expect(renderComponent.getByText('taxi.description1')).toBeInTheDocument();
  });
  it(`Description should be 'luggage.description2'`, () => {
    const renderComponent = render(<Taxi />);
    expect(renderComponent.getByText('taxi.description2')).toBeInTheDocument();
  });
})

describe('Contents of booking', () => {
  it('Content title should be rendered', () => {
    const renderComponent = render(<Taxi />);
    expect(renderComponent.getByText('taxi.booking')).toBeInTheDocument();
  })
  it('Caution of booking should be rendred', () => {
    const renderComponent = render(<Taxi />);
    expect(renderComponent.getByText('taxi.bookingAlert')).toBeInTheDocument();
  })
  it('Description of booking should be rendered', () => {
    const renderComponent = render(<Taxi />);
    expect(renderComponent.getByText('taxi.bookingDetail')).toBeInTheDocument();
  })
  it('6 Lists of the booking method should be rendered', () => {
    const { container } = render(<Taxi />);
    expect(container.querySelectorAll('.bookingListInfo').length).toEqual(6);
  })
})

describe('Table Titles', () => {
  it('ICN Table title should be rendered', () => {
    render(<Taxi />);
    expect(document.querySelector('.tableTitle')?.textContent).toBe('taxi.tableTitleICN');
  })
  it('GMP Discount Table title should be rendered', () => {
    render(<Taxi />);
    expect(document.querySelector('.tableTitleGMP')?.textContent).toBe('taxi.tableTitleGMP');
  })
})

describe('Contents of ICN Table', () => {
  const prices: any = {
    pickUpTime1: [ '6 / 6', '80,000', '70,000' ],
    pickUpTime2: [ '6 / 6', '95,000', '85,000' ],
    pickUpTime3: [ '6 / 6', '100,000', '90,000' ]
  }
  function PriceTable (prices: any) {
    <table>
      <thead>
        <tr>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {prices.pickUpTime1.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.pickUpTime2.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.pickUpTime3.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  it('table head title', () => {
    render(<Taxi />);
    expect(document.querySelector('.tableICNThead1')?.textContent).toBe('taxi.pickUpTIme');
    expect(document.querySelector('.tableICNThead2')?.textContent).toBe('taxi.seat');
    expect(document.querySelector('.tableICNThead3')?.textContent).toBe('taxi.rate');
    expect(document.querySelector('.tableICNThead4')?.textContent).toBe('taxi.discount');
  })
  it('Every heads of the columns in the price table should be rendered', () => {
    render(<Taxi />);
    expect(document.querySelector('.tableICNSecondColumn')?.textContent).toBe('11:00 - 14:00');
    expect(document.querySelector('.tableICNThirdColumn')?.textContent).toBe('05:00 - 10:30 / 14:30 - 22:30');
    expect(document.querySelector('.tableICNFourthColumn')?.textContent).toBe('23:00 - 04:30');
  })
  it('Every rows in the price table should be rendered', () => {
    render(<Taxi {...prices}/>);
    expect(document.querySelectorAll('.tableICNSecondRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.tableICNSecondRowPrice').length).toBe(3);
    expect(document.querySelectorAll('.tableICNThirdRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.tableICNThirdRowPrice').length).toBe(3);
    expect(document.querySelectorAll('.tableICNFourthRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.tableICNFourthRowPrice').length).toBe(3);
  })
})

describe('Contents of GMP Table', () => {
  const prices: any = {
    pickUpTime1: [ '6 / 6', '60,000', '52,000' ],
    pickUpTime2: [ '6 / 6', '75,000', '65,000' ],
    pickUpTime3: [ '6 / 6', '85,000', '75,000' ]
  }
  function PriceTable (prices: any) {
    <table>
      <thead>
        <tr>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {prices.pickUpTime1.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.pickUpTime2.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
        {prices.pickUpTime3.map((price: string) => (
          <tr>
            <th></th>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  }
  it('table head title', () => {
    render(<Taxi />);
    expect(document.querySelector('.tableGMPThead1')?.textContent).toBe('taxi.pickUpTIme');
    expect(document.querySelector('.tableGMPThead2')?.textContent).toBe('taxi.seat');
    expect(document.querySelector('.tableGMPThead3')?.textContent).toBe('taxi.rate');
    expect(document.querySelector('.tableGMPThead4')?.textContent).toBe('taxi.discount');
  })
  it('Every heads of the columns in the price table should be rendered', () => {
    render(<Taxi />);
    expect(document.querySelector('.tableGMPSecondColumn')?.textContent).toBe('11:00 - 14:00');
    expect(document.querySelector('.tableGMPThirdColumn')?.textContent).toBe('05:00 - 10:30 / 14:30 - 22:30');
    expect(document.querySelector('.tableGMPFourthColumn')?.textContent).toBe('23:00 - 04:30');
  })
  it('Every rows in the price table should be rendered', () => {
    render(<Taxi {...prices}/>);
    expect(document.querySelectorAll('.tableGMPSecondRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.tableGMPSecondRowPrice').length).toBe(3);
    expect(document.querySelectorAll('.tableGMPThirdRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.tableGMPThirdRowPrice').length).toBe(3);
    expect(document.querySelectorAll('.tableGMPFourthRowPrice')).toBeTruthy();
    expect(document.querySelectorAll('.tableGMPFourthRowPrice').length).toBe(3);
  })
})

describe('Price Information Lists', () => {
  it('6 Lists of price information should be rendered', () => {
    const { container } = render(<Taxi />);
    expect(container.querySelectorAll('.priceInfoList').length).toEqual(6);
  })
})
