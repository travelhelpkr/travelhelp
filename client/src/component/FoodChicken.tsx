import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import chickenImg from '../img/new_banner_CK.png';
import cartWhite from '../img/cart_white.png';
import cartNavy from '../img/cart_navy.png';
import ModalChicken from './ModalChicken';
import ModalSignin from './ModalSignin';
import '../scss/FoodChicken.scss';

function FoodChicken(props: any) {

  // userId props for modal
  const { userId } = props;

  // close modal status
  const ref = useRef<HTMLDivElement>(null);

  // menu of restaurant
  const [menu, setMenu] = useState<any>('');

  // information of restaurant
  const [information, setInformation] = useState<any>('');

  // open modal
  const [isOpen, setModal] = useState<boolean>(false);
  const [isSignin, setIsSignin] = useState<boolean>(false);

  // modal information
  const [menuId, setMenuId] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [optionName1, setOptionName1] = useState<string>('');
  const [optionName2, setOptionName2] = useState<string>('');
  const [optionPrice2, setOptionPrice2] = useState<number>(0);

  // modal Alert
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [optionError, setOptionError] = useState<boolean>(false);
  const [otherRestaurant, setOtherRestaurant] = useState<boolean>(false);

  // change language
  const { t } = useTranslation();

  // get restaurant menus
  useEffect(() => {
    axios.get('/api/foods/menu', 
    {
      params: {
        restaurant_id : 1
      }
    })
    .then(res => {
      console.log('res:', res);
      const menuResult = res.data.menu;
      const restaurantResult = res.data.restaurant;
      console.log('menuResult:', menuResult);
      console.log('restaurantResult:', restaurantResult);
      setMenu(menuResult);
      setInformation(restaurantResult);
    })
  },[])

  // close modal when clicked outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // close modal when clicked outside
  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (e.path[0].className !== 'openModalChicken') return;
      else if(e.path[0].className === 'modalCloseBtn') {
        setModal(false);
        setSuccess(false);
        setFailure(false);
        setOptionError(false);
        setOtherRestaurant(false);
      }
      else {
        setModal(false);
        setSuccess(false);
        setFailure(false);
        setOptionError(false);
        setOtherRestaurant(false);
      }
    }
  };

  // check signin status when user clicked cart icon on Nav bar
  const checkSigninStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(window.sessionStorage.getItem('id')) {
      window.location.href = '/user/cart';
    } else {
      e.preventDefault();
      setIsSignin(!isSignin);
    }
  }

  return(
  <div>
    {/* cart icon */}
    <div className='cartIcon'>
      <button className='cartIconBtn' onClick={checkSigninStatus}><img src={cartWhite} alt='cartIconBtn'/></button>
    </div>

    {/* choose restaurants btn */}
    <div className='restaurantsChicken'>
      <div className='chickenSelected'>
        <a href='/help/foodDelivery/chicken'>{t('food.chicken')}</a>
      </div>
      <div className='noodle'>
        <a href='/help/foodDelivery/noodle'>{t('food.noodle')}</a>
      </div>
    </div>

    <div className='menuContent'>

      {/* banner img */}
      <div className='banner'>
        <img src={chickenImg} alt='banner'/>
      </div>

      {/* restaurant information */}
      <div className='restaurantInfo'>
        { information ?
          <div>
            <div className='Info restaurantDes'>
              {
                window.localStorage.getItem('i18nextLng') === 'en'
                ? information.description_en
                : window.localStorage.getItem('i18nextLng') === 'zh'
                ? information.description_zh
                : information.description_ja
              }
            </div>
            <div className='Info restaurantName'>
              <span className='InfoDetailTitle'>{t('food.restaurant')}</span>
              {
                window.localStorage.getItem('i18nextLng') === 'en'
                ? information.name_en
                : window.localStorage.getItem('i18nextLng') === 'zh'
                ? information.name_zh
                : information.name_ja
              }
            </div>
            <div className='Info restaurantHour'>
              <span className='InfoDetailTitle'>{t('food.hour')}</span>
              {information.operation_hour}
            </div>
            <div className='Info restaurantMin'>
              <span className='InfoDetailTitle'>{t('food.minimum')}</span>
              {information.minimum_price.toLocaleString()}
            </div>
            <div className='Info restaurantDel'>
              <span className='InfoDetailTitle'>{t('food.delivery')}</span>
              {information.delivery_fee.toLocaleString()}
            </div>
          </div>
          : <div></div>
        }       
      </div>

      {/* menu list */}
      <ul>
        {
          menu && menu.map((menu: any) => {
            console.log('options:', menu.Options[0].name_en);
            return(
              <div key={menu.id} ref={ref} className='menuLi' onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                setModal(!isOpen);
                setMenuId(menu.id);
                setImage(menu.image);
                setName(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.name_zh
                  : menu.name_ja
                );
                setPrice(menu.price);
                setDescription(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.description_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.description_zh
                  : menu.description_ja
                );
                setOptionName1(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.Options[0].name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.Options[0].name_zh
                  : menu.Options[0].name_ja
                );
                setOptionName2(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.Options[1].name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.Options[1].name_zh
                  : menu.Options[1].name_ja
                );
                setOptionPrice2(menu.Options[1].price);
              }}>
                <li key={menu.id}>
                  <img src={menu.image} alt='menuImage'/>
                  <div className='menuName'>
                    {
                      window.localStorage.getItem('i18nextLng') === 'en'
                      ? menu.name_en
                      :
                      window.localStorage.getItem('i18nextLng') === 'zh'
                      ? menu.name_zh
                      : menu.name_ja
                    }
                  </div>
                  <div className='menuPrice'>{menu.price.toLocaleString()}₩</div>
                  <button className='addCartBtn'><img src={cartNavy} alt='cartIcon'/></button>
                </li>
              </div>
            )
          })
        }
      </ul>

      {/* chicken modal */}
      <ModalChicken isOpen={isOpen} setModal={setModal} infoMenuId={menuId} infoImage={image} infoName={name} infoPrice={price} infoDescription={description} infoOptionName1={optionName1} infoOptionName2={optionName2} infoOptionPrice2={optionPrice2} setSuccess={setSuccess} success={success} setFailure={setFailure} failure={failure} setOptionError={setOptionError} optionError={optionError} setOtherRestaurant={setOtherRestaurant} otherRestaurant={otherRestaurant} />

      {/* signin modal */}
      <ModalSignin isSignin={isSignin} setIsSignin={setIsSignin} />
    </div>
  </div>

  )
}

export default FoodChicken; 