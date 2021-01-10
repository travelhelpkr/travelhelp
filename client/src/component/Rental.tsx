import * as React from 'react';
import { useTranslation } from 'react-i18next';
import wifi from '../img/wifi.png';
import luggageScale from '../img/luggageScale.png';
import adaptor from '../img/adaptor.png';
import chargingCable from '../img/chargingCable.png';
import '../scss/Rental.scss';

function Rental() {

  // change language handler
  const { t } = useTranslation();

  return(
    <div className='background'>

      <h1 className='h1'>{t('rental.title')}</h1>

      {/* portable wifi */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.wifi')}</div>
        <div className='contentImg'><img src={wifi} alt='wifi' className='wifiImage'/></div>
        <div className='contentDetail'>{t('rental.wifiDetail')}</div>
        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td></td>
              <td className='wifiTableTHead1'>{t('rental.rate')}(KRW)</td>
              <td className='wifiTableTHead2'>{t('rental.data')}</td>
              <td className='wifiTableTHead3'>{t('rental.deposit')}(KRW)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='firstColumn wifiTableFirstColumn'>WiBro</td>
              <td className='wifiRate'>5,500 / {t('luggage.day')}</td>
              <td className='wifiData'>1GB / {t('luggage.day')}</td>
              <td className='wifiDeposit'>200,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* luggage scale */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.luggageScale')}</div>
        <div className='contentImg'><img src={luggageScale} alt='luggageScale' className='luggageScaleImage'/></div>
        <ul className='contentDetailList luggageDetailTitle'>{t('rental.luggageDetailTitle')}
          <li className='luggageScaleDetail'>{t('rental.luggageDetail1')}</li>
          <li className='luggageScaleDetail'>{t('rental.luggageDetail2')}</li>
          <li className='luggageScaleDetail'>{t('rental.luggageDetail3')}</li>
        </ul>

        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td></td>
              <td className='luggageScaleTableTHead1'>{t('rental.rate')}(KRW)</td>
              <td className='luggageScaleTableTHead2'>{t('rental.deposit')}(KRW)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='firstColumn luggageScaleTableFirstColumn'>{t('rental.luggageScale')}</td>
              <td className='luggageScaleRate'>1,000</td>
              <td className='luggageScaleDeposit'>20,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* adaptor */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.adaptor')}</div>
        <div className='contentImg'><img src={adaptor} alt='adaptor' className='adaptorImage'/></div>
        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td></td>
              <td className='adaptorTableTHead1'>{t('rental.rate')}(KRW)</td>
              <td className='adaptorTableTHead2'>{t('rental.deposit')}(KRW)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='firstColumn adaptorTableFirstColumn'>{t('rental.adaptor')}</td>
              <td className='adaptorRate'>1,000 / 2ea</td>
              <td className='adaptorDeposit'>10,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* charging cable */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.chargingCable')}</div>
        <div className='contentImg'><img src={chargingCable} alt='chargingCable' className='chargingCableImage'/></div>
        <ul className='contentDetailList'>{t('rental.chargingCableDetailTitle')}
          <li className='chargingCableDetail'>{t('rental.chargingCableDetail1')}</li>
          <li className='chargingCableDetail'>{t('rental.chargingCableDetail2')}</li>
          <li className='chargingCableDetail'>{t('rental.chargingCableDetail3')}</li>
        </ul>

        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td></td>
              <td className='chargingCableTableTHead1'>{t('rental.rate')}(KRW)</td>
              <td className='chargingCableTableTHead2'>{t('rental.deposit')}(KRW)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='firstColumn chargingCableTableFirstColumn'>{t('rental.chargingCable')}</td>
              <td className='chargingCableRate'>1,000</td>
              <td className='chargingCableDeposit'>20,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    
    </div>
  )
}

export default Rental;