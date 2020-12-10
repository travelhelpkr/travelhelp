import * as React from 'react';
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
          <li className='bookingListInfo'>{t('taxi.bookingInfo1')}</li>
          <li className='bookingListInfo'>{t('taxi.bookingInfo2')}</li>
          <li className='bookingListInfo'>{t('taxi.bookingInfo3')}</li>
          <li className='bookingListInfo'>{t('taxi.bookingInfo4')}</li>
          <li className='bookingListInfo'>{t('taxi.bookingInfo5')}</li>
          <li className='bookingListInfo'>{t('taxi.bookingInfo6')}</li>
        </ul>
      </div>

      {/* price list - ICN airport */}
      <div className='contentTable'>
        <div className='tableTitle'>{t('taxi.tableTitleICN')}</div>
        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td className='tableICNThead1'>{t('taxi.pickUpTIme')}</td>
              <td className='tableICNThead2'>{t('taxi.seat')}</td>
              <td className='tableICNThead3'>{t('taxi.rate')}</td>
              <td className='tableICNThead4'>{t('taxi.discount')}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='firstColumn tableICNSecondColumn'>11:00 - 14:00</td>
              <td className='tableICNSecondRowPrice'>6 / 6</td>
              <td className='tableICNSecondRowPrice'>80,000</td>
              <td className='tableICNSecondRowPrice'>70,000</td>
            </tr>
            <tr>
              <td className='firstColumn tableICNThirdColumn'>05:00 - 10:30 / 14:30 - 22:30</td>
              <td className='tableICNThirdRowPrice'>6 / 6</td>
              <td className='tableICNThirdRowPrice'>95,000</td>
              <td className='tableICNThirdRowPrice'>85,000</td>
            </tr>
            <tr>
              <td className='firstColumn tableICNFourthColumn'>23:00 - 04:30</td>
              <td className='tableICNFourthRowPrice'>6 / 6</td>
              <td className='tableICNFourthRowPrice'>100,000</td>
              <td className='tableICNFourthRowPrice'>90,000</td>
            </tr>
          </tbody>
        </table>

      {/* price list - GMP airport */}
        <div className='tableTitleGMP'>{t('taxi.tableTitleGMP')}</div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td className='tableGMPThead1'>{t('taxi.pickUpTIme')}</td>
            <td className='tableGMPThead2'>{t('taxi.seat')}</td>
            <td className='tableGMPThead3'>{t('taxi.rate')}</td>
            <td className='tableGMPThead4'>{t('taxi.discount')}</td>
          </tr>
          <tr>
            <td className='firstColumn tableGMPSecondColumn'>11:00 - 14:00</td>
            <td className='tableGMPSecondRowPrice'>6 / 6</td>
            <td className='tableGMPSecondRowPrice'>60,000</td>
            <td className='tableGMPSecondRowPrice'>52,000</td>
          </tr>
          <tr>
            <td className='firstColumn tableGMPThirdColumn'>05:00 - 10:30 / 14:30 - 22:30</td>
            <td className='tableGMPThirdRowPrice'>6 / 6</td>
            <td className='tableGMPThirdRowPrice'>75,000</td>
            <td className='tableGMPThirdRowPrice'>65,000</td>
          </tr>
          <tr>
            <td className='firstColumn tableGMPFourthColumn'>23:00 - 04:30</td>
            <td className='tableGMPFourthRowPrice'>6 / 6</td>
            <td className='tableGMPFourthRowPrice'>85,000</td>
            <td className='tableGMPFourthRowPrice'>75,000</td>
          </tr>
        </table>
        <ul className='priceInfo'>
          <li className='priceInfoList'>{t('taxi.priceInfo1')}</li>
          <li className='priceInfoList'>{t('taxi.priceInfo2')}</li>
          <li className='priceInfoList'>{t('taxi.priceInfo3')}</li>
          <li className='priceInfoList'>{t('taxi.priceInfo4')}</li>
          <li className='priceInfoList'>{t('taxi.priceInfo5')}</li>
          <li className='priceInfoList'>{t('taxi.priceInfo6')}</li>
        </ul>
      </div>
    </div>
  )
}

export default Taxi;