import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../scss/Rental.scss';
import wifi from '../img/wifi.png';
import luggageScale from '../img/luggageScale.png';
import adaptor from '../img/adaptor.png';
import chargingCable from '../img/chargingCable.png';

function Taxi() {

  // change language handler
  const { t } = useTranslation();

  return(
    <div className='background'>

      <h1 className='h1'>{t('rental.title')}</h1>

      {/* portable wifi */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.wifi')}</div>
        <div className='contentImg'><img src={wifi}/></div>
        <div className='contentDetail'>{t('rental.wifiDetail')}</div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td></td>
            <td>{t('rental.rate')}(KRW)</td>
            <td>{t('rental.data')}</td>
            <td>{t('rental.deposit')}(KRW)</td>
          </tr>
          <tr>
            <td className='firstColumn'>WiBro</td>
            <td>5,500 / {t('luggage.day')}</td>
            <td>1GB / {t('luggage.day')}</td>
            <td>200,000</td>
          </tr>
        </table>
      </div>

      {/* luggage scale */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.luggageScale')}</div>
        <div className='contentImg'><img src={luggageScale}/></div>
        <ul className='contentDetailList'>{t('rental.luggageDetailTitle')}
          <li>{t('rental.luggageDetail1')}</li>
          <li>{t('rental.luggageDetail2')}</li>
          <li>{t('rental.luggageDetail3')}</li>
        </ul>

        <table className='priceTable'>
          <tr className='firstRow'>
            <td></td>
            <td>{t('rental.rate')}(KRW)</td>
            <td>{t('rental.deposit')}(KRW)</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('rental.luggageScale')}</td>
            <td>1,000</td>
            <td>20,000</td>
          </tr>
        </table>
      </div>
      
      {/* adaptor */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.adaptor')}</div>
        <div className='contentImg'><img src={adaptor}/></div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td></td>
            <td>{t('rental.rate')}(KRW)</td>
            <td>{t('rental.deposit')}(KRW)</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('rental.adaptor')}</td>
            <td>1,000 / 2ea</td>
            <td>10,000</td>
          </tr>
        </table>
      </div>

      {/* charging cable */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('rental.chargingCable')}</div>
        <div className='contentImg'><img src={chargingCable}/></div>
        <ul className='contentDetailList'>{t('rental.chargingCableDetailTitle')}
          <li>{t('rental.chargingCableDetail1')}</li>
          <li>{t('rental.chargingCableDetail2')}</li>
          <li>{t('rental.chargingCableDetail3')}</li>
        </ul>

        <table className='priceTable'>
          <tr className='firstRow'>
            <td></td>
            <td>{t('rental.rate')}(KRW)</td>
            <td>{t('rental.deposit')}(KRW)</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('rental.chargingCable')}</td>
            <td>1,000</td>
            <td>20,000</td>
          </tr>
        </table>
      </div>
    
    </div>
  )
}

export default withRouter(Taxi);