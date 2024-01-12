import './Main.scss';

import hamburguerLand from '../../images/HamburLand.png';
import restaurantLand from '../../images/restaurantLand.png';

function Main() {
  return (
    <main>
        <div className='background'>
            <img src={hamburguerLand} alt='imagem principal'></img>
            <svg xmlns="http://www.w3.org/2000/svg" width="1300" height="997" viewBox="0 0 1243 997" fill="none">
                <path d="M54.1228 454.381C1.58866 495.226 -18.6301 525.543 23.8998 718.008C66.4297 910.472 145.134 1002.44 288.196 996.062C431.259 989.681 578.506 657.888 649.689 606.654C720.873 555.42 1211.11 647.319 1239.05 390.809C1267 134.299 1100.76 -45.6592 926.377 11.3934C751.988 68.4461 703.68 373.067 624.807 435.83C545.935 498.593 106.657 413.535 54.1228 454.381Z" fill="#F9D923"/>
            </svg>
        </div>

        <div className='land-info'>
            <h2>
                Conheça o Melhor <span>Hambúrguer</span> de João Pessoa !
            </h2>
            <p>
                R. Elizo Afonso Marques de Carvalho, 130
            </p>

            <button> Peça já! </button>
        </div>

        <div className='restaurant-info'>
            <div>
                <div className='text'>
                    <h3>
                        Nossa <span>Casa</span>
                    </h3>
                    <p>
                        Ja estamos esperando por você!
                    </p>
                </div>

                <img src={restaurantLand} alt='restaurante HambuBar'></img>
            </div>

            <h4>
                Aberto das 14 as 22
            </h4>
        </div>
    </main>
  )
}

export default Main