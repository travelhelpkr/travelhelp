import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../scss/Taxi.scss';

function Taxi() {

  // change language handler
  const { t } = useTranslation();

  return(
    <div className='background'>

      <h1 className='h1'>{t('taxi.title')}</h1>
      <div className='description'>{t('taxi.description1')}</div>
      <div className='description'>{t('taxi.description2')}</div>

      {/* booking information list */}
      <div className='contentTable'>
        <div className='contentTitle'>{t('taxi.booking')}</div>
        <div className='contentTitleAlert'>{t('taxi.bookingAlert')}</div>
        <div className='contentDetail'>{t('taxi.bookingDetail')}</div>
        <ul className='bookingList'>
          <li>{t('taxi.bookingInfo1')}</li>
          <li>{t('taxi.bookingInfo2')}</li>
          <li>{t('taxi.bookingInfo3')}</li>
          <li>{t('taxi.bookingInfo4')}</li>
          <li>{t('taxi.bookingInfo5')}</li>
          <li>{t('taxi.bookingInfo6')}</li>
        </ul>
      </div>

      {/* price list - ICN airport */}
      <div className='contentTable'>
        <div className='tableTitle'>{t('taxi.tableTitleICN')}</div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td>{t('taxi.pickUpTIme')}</td>
            <td>{t('taxi.seat')}</td>
            <td>{t('taxi.rate')}</td>
            <td>{t('taxi.discount')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>11:00 - 14:00</td>
            <td>6 / 6</td>
            <td>80,000</td>
            <td>70,000</td>
          </tr>
          <tr>
            <td className='firstColumn'>05:00 - 10:30 / 14:30 - 22:30</td>
            <td>6 / 6</td>
            <td>95,000</td>
            <td>85,000</td>
          </tr>
          <tr>
            <td className='firstColumn'>23:00 - 04:30</td>
            <td>6 / 6</td>
            <td>100,000</td>
            <td>90,000</td>
          </tr>
        </table>

      {/* price list - GMP airport */}
        <div className='tableTitleGMP'>{t('taxi.tableTitleGMP')}</div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td>{t('taxi.pickUpTIme')}</td>
            <td>{t('taxi.seat')}</td>
            <td>{t('taxi.rate')}</td>
            <td>{t('taxi.discount')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>11:00 - 14:00</td>
            <td>6 / 6</td>
            <td>60,000</td>
            <td>52,000</td>
          </tr>
          <tr>
            <td className='firstColumn'>05:00 - 10:30 / 14:30 - 22:30</td>
            <td>6 / 6</td>
            <td>75,000</td>
            <td>65,000</td>
          </tr>
          <tr>
            <td className='firstColumn'>23:00 - 04:30</td>
            <td>6 / 6</td>
            <td>85,000</td>
            <td>75,000</td>
          </tr>
        </table>
        <ul className='priceInfo'>
          <li>{t('taxi.priceInfo1')}</li>
          <li>{t('taxi.priceInfo2')}</li>
          <li>{t('taxi.priceInfo3')}</li>
          <li>{t('taxi.priceInfo4')}</li>
          <li>{t('taxi.priceInfo5')}</li>
          <li>{t('taxi.priceInfo6')}</li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Taxi);