import * as React from 'react';
import { render } from '@testing-library/react';
import Rental from '../component/Rental';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Portable WiFi', () => {
  it(`has title of 'rental.wifi'`, () => {
    const { getByText } = render(<Rental />);
    expect(getByText('rental.wifi')).toBeInTheDocument();
  });
  it('has WiFi image', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.wifiImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.wifiImage')?.getAttribute('alt');

    expect(imageAlt).toBe('wifi');
    expect(imageSource).toBe('wifi.png');
  })
  it('has description', () => {
    const { getByText } = render(<Rental />);
    expect(getByText('rental.wifiDetail')).toBeInTheDocument();
  })

  describe('Table of WiFi', () => {
    it('has title of table head', () => {
      render(<Rental />);
      expect(document.querySelector('.wifiTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.wifiTableTHead2')?.textContent).toBe('rental.data');
      expect(document.querySelector('.wifiTableTHead3')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('has head of the column in the wifi table', () => {
      render(<Rental />);
      expect(document.querySelector('.wifiTableFirstColumn')?.textContent).toBe('WiBro');
    })
    it('has contents of the wifi table', () => {
      render(<Rental />);
      expect(document.querySelector('.wifiRate')?.textContent).toBe('5,500 / luggage.day');
      expect(document.querySelector('.wifiData')?.textContent).toBe('1GB / luggage.day');
      expect(document.querySelector('.wifiDeposit')?.textContent).toBe('200,000');
    })
  })
})

describe('Luggage Scale', () => {
  it(`has title of 'rental.luggageScale'`, () => {
    const { getAllByText } = render(<Rental />);
    expect(getAllByText('rental.luggageScale')[0]).toBeInTheDocument();
  });
  it('has image of luggage scale', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.luggageScaleImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.luggageScaleImage')?.getAttribute('alt');

    expect(imageAlt).toBe('luggageScale');
    expect(imageSource).toBe('luggageScale.png');
  })
  it('has description', () => {
    const { container, getAllByText } = render(<Rental />);

    expect(getAllByText('rental.luggageDetailTitle')[0]).toBeInTheDocument();
    expect(container.querySelectorAll('.luggageScaleDetail').length).toEqual(3);
  })
  describe('Table of Luggage Scale', () => {
    it('has table head titles', () => {
      render(<Rental />);
      expect(document.querySelector('.luggageScaleTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.luggageScaleTableTHead2')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('has head of the column in the Luggage Scale table', () => {
      render(<Rental />);
      expect(document.querySelector('.luggageScaleTableFirstColumn')?.textContent).toBe('rental.luggageScale');
    })
    it('has contents of the Luggage Scale table', () => {
      render(<Rental />);
      expect(document.querySelector('.luggageScaleRate')?.textContent).toBe('1,000');
      expect(document.querySelector('.luggageScaleDeposit')?.textContent).toBe('20,000');
    })
  })
})

describe('Adaptor', () => {
  it(`has title of 'rental.adaptor'`, () => {
    const { getAllByText } = render(<Rental />);
    expect(getAllByText('rental.adaptor')[0]).toBeInTheDocument();
  });
  it('has image of adaptor', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.adaptorImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.adaptorImage')?.getAttribute('alt');

    expect(imageAlt).toBe('adaptor');
    expect(imageSource).toBe('adaptor.png');
  })
  describe('Table of Adaptor', () => {
    it('has table head titles', () => {
      render(<Rental />);
      expect(document.querySelector('.adaptorTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.adaptorTableTHead2')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('has head of the column in the Luggage Scale table', () => {
      render(<Rental />);
      expect(document.querySelector('.adaptorTableFirstColumn')?.textContent).toBe('rental.adaptor');
    })
    it('has contents of the Luggage Scale table', () => {
      render(<Rental />);
      expect(document.querySelector('.adaptorRate')?.textContent).toBe('1,000 / 2ea');
      expect(document.querySelector('.adaptorDeposit')?.textContent).toBe('10,000');
    })
  })
})

describe('Charging Cable', () => {
  it(`has title of 'rental.chargingCable'`, () => {
    const { getAllByText } = render(<Rental />);
    expect(getAllByText('rental.chargingCable')[0]).toBeInTheDocument();
  });
  it('has image of charging cable', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.chargingCableImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.chargingCableImage')?.getAttribute('alt');

    expect(imageAlt).toBe('chargingCable');
    expect(imageSource).toBe('chargingCable.png');
  })
  it('has description', () => {
    const { container, getAllByText } = render(<Rental />);

    expect(getAllByText('rental.chargingCableDetailTitle')[0]).toBeInTheDocument();
    expect(container.querySelectorAll('.luggageScaleDetail').length).toEqual(3);
  })
  describe('Table of Charging Cable', () => {
    it('has table head titles', () => {
      render(<Rental />);
      expect(document.querySelector('.chargingCableTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.chargingCableTableTHead2')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('has head of the column in the Charging Cable table', () => {
      render(<Rental />);
      expect(document.querySelector('.chargingCableTableFirstColumn')?.textContent).toBe('rental.chargingCable');
    })
    it('has contents of the Charging Cable table should ', () => {
      render(<Rental />);
      expect(document.querySelector('.chargingCableRate')?.textContent).toBe('1,000');
      expect(document.querySelector('.chargingCableDeposit')?.textContent).toBe('20,000');
    })
  })
})