import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import size_guideline from '../img/size_guideline.jpg';
import '../scss/Luggage.scss';

function Luggage() {

  // change language handler
  const { t } = useTranslation();

  return(
    <div className='background'>

      <h1 className='h1'>{t('luggage.title')}</h1>
      <div className='description'>{t('luggage.description1')}</div>
      <div className='description'>{t('luggage.description2')}</div>

      {/* price table */}
      <div className='contentTable'>
        <div className='tableTitle'>{t('luggage.tableTitle')} (KRW)</div>
        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td></td>
              <td className='priceTableTHead1'>~4 {t('luggage.hour')}</td>
              <td className='priceTableTHead2'>~8 {t('luggage.hour')}</td>
              <td className='priceTableTHead3'>1 {t('luggage.day')}</td>
              <td className='priceTableTHead4'>2 ~ 10 {t('luggage.day')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className='secondRow'>
              <td className='firstColumn priceTableSecondColumn'>{t('luggage.small')}(~19 inch)</td>
              <td className='priceTableSecondRowPrice1'>2,000</td>
              <td className='priceTableSecondRowPrice2'>3,000</td>
              <td className='priceTableSecondRowPrice3'>4,000</td>
              <td className='priceTableSecondRowPrice4'>4,000+3,000*{t('luggage.day')}</td>
            </tr>
            <tr className='thirdRow'>
              <td className='firstColumn priceTableThirdColumn'>{t('luggage.medium')}(20~29 inch)</td>
              <td className='priceTableThirdRowPrice1'>3,000</td>
              <td className='priceTableThirdRowPrice2'>4,500</td>
              <td className='priceTableThirdRowPrice3'>6,000</td>
              <td className='priceTableThirdRowPrice4'>6,000+4,000*{t('luggage.day')}</td>
            </tr>
            <tr className='fourthRow'>
              <td className='firstColumn priceTableFourthColumn'>{t('luggage.large')}(30 inch ~)</td>
              <td className='priceTableFourthRowPrice1'>4,000</td>
              <td className='priceTableFourthRowPrice2'>6,000</td>
              <td className='priceTableFourthRowPrice3'>8,000</td>
              <td className='priceTableFourthRowPrice4'>8,000+5,000*{t('luggage.day')}</td>
            </tr>
          </tbody>
        </table>

        <div className='tableTitleDiscounted'>{t('luggage.tableTitleDiscounted')}</div>
        <table className='priceTable'>
          <thead>
            <tr className='firstRow'>
              <td></td>
              <td className='discountedTableTHead1'>~4 {t('luggage.hour')}</td>
              <td className='discountedTableTHead2'>~8 {t('luggage.hour')}</td>
              <td className='discountedTableTHead3'>1 {t('luggage.day')}</td>
              <td className='discountedTableTHead4'>2 ~ 10 {t('luggage.day')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className='secondRow'>
              <td className='firstColumn discountedSecondColumn'>{t('luggage.small')}(~19 inch)</td>
              <td className='discountedTableSecondRowPrice1'>1,000</td>
              <td className='discountedTableSecondRowPrice2'>2,000</td>
              <td className='discountedTableSecondRowPrice3'>3,000</td>
              <td className='discountedTableSecondRowPrice4'>3,000+2,000*{t('luggage.day')}</td>
            </tr>
            <tr className='thirdRow'>
              <td className='firstColumn discountedThirdColumn'>{t('luggage.medium')}(20~29 inch)</td>
              <td className='discountedTableThirdRowPrice1'>2,000</td>
              <td className='discountedTableThirdRowPrice2'>3,000</td>
              <td className='discountedTableThirdRowPrice3'>4,000</td>
              <td className='discountedTableThirdRowPrice4'>4,000+3,000*{t('luggage.day')}</td>
            </tr>
            <tr className='fourthRow'>
              <td className='firstColumn discountedFourthColumn'>{t('luggage.large')}(30 inch ~)</td>
              <td className='discountedTableFourthRowPrice1'>3,000</td>
              <td className='discountedTableFourthRowPrice2'>4,000</td>
              <td className='discountedTableFourthRowPrice3'>5,000</td>
              <td className='discountedTableFourthRowPrice4'>5,000+4,000*{t('luggage.day')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* size guideline */}
      <div className='sizeTable'>
        <div className='sizeGuideline'>
          <img className='sizeImg' src={size_guideline} alt='sizeImg'/>
        </div>
        <ul className='sizeDetail'>
          <li>{t('luggage.sizeDetail1')}</li>
          <li>{t('luggage.sizeDetail2')}</li>
          <li>{t('luggage.sizeDetail3')}
            <ul>
              <li>{t('luggage.sizeOfLuggage1')}</li>
              <li>{t('luggage.sizeOfLuggage2')}</li>
              <li>{t('luggage.sizeOfLuggage3')}</li>
            </ul>
          </li>
          <li>{t('luggage.sizeDetail4')}</li>
          <li>{t('luggage.sizeDetail5')}</li>
          <li>{t('luggage.sizeDetail6')}</li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Luggage);