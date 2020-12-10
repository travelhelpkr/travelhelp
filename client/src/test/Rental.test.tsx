import * as React from 'react';
import { render } from '@testing-library/react';
import Rental from '../component/Rental';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

describe('Portable WiFi', () => {
  it(`Title should be 'rental.wifi'`, () => {
    const renderComponent = render(<Rental />);
    expect(renderComponent.getByText('rental.wifi')).toBeInTheDocument();
  });
  it('WiFi image should be rendered', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.wifiImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.wifiImage')?.getAttribute('alt');
    expect(imageAlt).toBe('wifi');
    expect(imageSource).toBe('wifi.png');
  })
  it('Description should be rendered', () => {
    const renderComponent = render(<Rental />);
    expect(renderComponent.getByText('rental.wifiDetail')).toBeInTheDocument();
  })
  describe('Table of WiFi', () => {
    it('table head titles should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.wifiTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.wifiTableTHead2')?.textContent).toBe('rental.data');
      expect(document.querySelector('.wifiTableTHead3')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('Head of the column in the wifi table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.wifiTableFirstColumn')?.textContent).toBe('WiBro');
    })
    it('Contents of the wifi table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.wifiRate')?.textContent).toBe('5,500 / luggage.day');
      expect(document.querySelector('.wifiData')?.textContent).toBe('1GB / luggage.day');
      expect(document.querySelector('.wifiDeposit')?.textContent).toBe('200,000');
    })
  })
})

describe('Luggage Scale', () => {
  it(`Title should be 'rental.luggageScale'`, () => {
    const renderComponent = render(<Rental />);
    expect(renderComponent.getAllByText('rental.luggageScale')[0]).toBeInTheDocument();
  });
  it('Luggage Scale image should be rendered', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.luggageScaleImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.luggageScaleImage')?.getAttribute('alt');
    expect(imageAlt).toBe('luggageScale');
    expect(imageSource).toBe('luggageScale.png');
  })
  it('Description should be rendered', () => {
    const { container } = render(<Rental />);
    const renderComponent = render(<Rental />);
    expect(renderComponent.getAllByText('rental.luggageDetailTitle')[0]).toBeInTheDocument();
    expect(container.querySelectorAll('.luggageScaleDetail').length).toEqual(3);
  })
  describe('Table of Luggage Scale', () => {
    it('Table head titles should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.luggageScaleTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.luggageScaleTableTHead2')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('Head of the column in the Luggage Scale table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.luggageScaleTableFirstColumn')?.textContent).toBe('rental.luggageScale');
    })
    it('Contents of the Luggage Scale table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.luggageScaleRate')?.textContent).toBe('1,000');
      expect(document.querySelector('.luggageScaleDeposit')?.textContent).toBe('20,000');
    })
  })
})

describe('Adaptor', () => {
  it(`Title should be 'rental.adaptor'`, () => {
    const renderComponent = render(<Rental />);
    expect(renderComponent.getAllByText('rental.adaptor')[0]).toBeInTheDocument();
  });
  it('adaptor image should be rendered', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.adaptorImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.adaptorImage')?.getAttribute('alt');
    expect(imageAlt).toBe('adaptor');
    expect(imageSource).toBe('adaptor.png');
  })
  describe('Table of Adaptor', () => {
    it('Table head titles should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.adaptorTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.adaptorTableTHead2')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('Head of the column in the Luggage Scale table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.adaptorTableFirstColumn')?.textContent).toBe('rental.adaptor');
    })
    it('Contents of the Luggage Scale table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.adaptorRate')?.textContent).toBe('1,000 / 2ea');
      expect(document.querySelector('.adaptorDeposit')?.textContent).toBe('10,000');
    })
  })
})

describe('Charging Cable', () => {
  it(`Title should be 'rental.chargingCable'`, () => {
    const renderComponent = render(<Rental />);
    expect(renderComponent.getAllByText('rental.chargingCable')[0]).toBeInTheDocument();
  });
  it('Charging Cable image should be rendered', () => {
    render(<Rental />);
    const imageSource = document.querySelector('.chargingCableImage')?.getAttribute('src');
    const imageAlt = document.querySelector('.chargingCableImage')?.getAttribute('alt');
    expect(imageAlt).toBe('chargingCable');
    expect(imageSource).toBe('chargingCable.png');
  })
  it('Description should be rendered', () => {
    const { container } = render(<Rental />);
    const renderComponent = render(<Rental />);
    expect(renderComponent.getAllByText('rental.chargingCableDetailTitle')[0]).toBeInTheDocument();
    expect(container.querySelectorAll('.luggageScaleDetail').length).toEqual(3);
  })
  describe('Table of Charging Cable', () => {
    it('Table head titles should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.chargingCableTableTHead1')?.textContent).toBe('rental.rate(KRW)');
      expect(document.querySelector('.chargingCableTableTHead2')?.textContent).toBe('rental.deposit(KRW)');
    })
    it('Head of the column in the Charging Cable table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.chargingCableTableFirstColumn')?.textContent).toBe('rental.chargingCable');
    })
    it('Contents of the Charging Cable table should be rendered', () => {
      render(<Rental />);
      expect(document.querySelector('.chargingCableRate')?.textContent).toBe('1,000');
      expect(document.querySelector('.chargingCableDeposit')?.textContent).toBe('20,000');
    })
  })
})