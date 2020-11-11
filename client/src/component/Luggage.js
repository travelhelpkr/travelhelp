import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../scss/Luggage.scss';
import size_guideline from '../img/size_guideline.jpg';

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
        <div className='tableTitle'> - {t('luggage.tableTitle')} (KRW) -</div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td></td>
            <td>~4 {t('luggage.hour')}</td>
            <td>~8 {t('luggage.hour')}</td>
            <td>1 {t('luggage.day')}</td>
            <td>2 ~ 10 {t('luggage.day')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('luggage.small')}(~19 inch)</td>
            <td>2,000</td>
            <td>3,000</td>
            <td>4,000</td>
            <td>4,000+3,000*{t('luggage.day')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('luggage.medium')}(20~29 inch)</td>
            <td>3,000</td>
            <td>4,500</td>
            <td>6,000</td>
            <td>6,000+4,000*{t('luggage.day')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('luggage.large')}(30 inch ~)</td>
            <td>4,000</td>
            <td>6,000</td>
            <td>8,000</td>
            <td>8,000+5,000*{t('luggage.day')}</td>
          </tr>
        </table>

        <div className='tableTitleDiscounted'> - {t('luggage.tableTitleDiscounted')} -</div>
        <table className='priceTable'>
          <tr className='firstRow'>
            <td></td>
            <td>~4 {t('luggage.hour')}</td>
            <td>~8 {t('luggage.hour')}</td>
            <td>1 {t('luggage.day')}</td>
            <td>2 ~ 10 {t('luggage.day')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('luggage.small')}(~19 inch)</td>
            <td>1,000</td>
            <td>2,000</td>
            <td>3,000</td>
            <td>3,000+2,000*{t('luggage.day')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('luggage.medium')}(20~29 inch)</td>
            <td>2,000</td>
            <td>3,000</td>
            <td>4,000</td>
            <td>4,000+3,000*{t('luggage.day')}</td>
          </tr>
          <tr>
            <td className='firstColumn'>{t('luggage.large')}(30 inch ~)</td>
            <td>3,000</td>
            <td>4,000</td>
            <td>5,000</td>
            <td>5,000+4,000*{t('luggage.day')}</td>
          </tr>
        </table>
      </div>

      {/* size guideline */}
      <div className='sizeTable'>
        <div className='sizeGuidelineTitle'> - Size Guideline -</div>
        <div className='sizeGuideline'>
          <img className='sizeImg' src={size_guideline} />
        </div>
        <ul className='sizeDetail'>
          <li>{t('luggage.sizeDetail1')}</li>
          <li>{t('luggage.sizeDetail2')}</li>
          <li>{t('luggage.sizeDetail3')}
            <li>{t('luggage.sizeOfLuggage1')}</li>
            <li>{t('luggage.sizeOfLuggage2')}</li>
            <li>{t('luggage.sizeOfLuggage3')}</li>
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