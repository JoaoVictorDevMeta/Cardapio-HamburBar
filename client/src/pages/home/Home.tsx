import './Home.scss';
import comboImage from '../../images/comboImage.png';

import MainInfo from '../../components/main/Main';
import MenuContainer from '../../components/product-container/MenuContainer';

function Home() {
    

  return (
    <>
        <MainInfo/>

        <section className='menu'>
            <div className='title'>
                <h2>
                    Nosso
                </h2>
                <h1>
                    MENU
                </h1>
            </div>
            
            <MenuContainer lado={false} categoria="combo" imagem={comboImage} titulo="Combos para você!" />

            <MenuContainer lado={true} categoria="hamburguer" imagem={comboImage} titulo="Nossos melhores Hamburguers" />
            
            <MenuContainer lado={false} categoria="acompanhamento" imagem={comboImage} titulo="Para acompanhar" />
        </section>

        <section className='social'>

        </section>
    </>
  )
}

export default Home