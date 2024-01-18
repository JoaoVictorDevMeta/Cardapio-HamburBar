import Hamburguer1 from '../../images/Hamburguer1.png'
import './login.scss'

import LoginForm from '../../components/login-form/LoginForm'

function Login() {

  return (
    <div className='login'>
      <section className="background-login">
        <svg xmlns="http://www.w3.org/2000/svg" width="848" height="484" viewBox="0 0 848 484" fill="none">
          <path d="M328 95.5C198 93.5 -76 0 -76 0L-94 661.5L670.5 672.5C670.5 672.5 822 384 842 276C862 168 829 95.5 721 27C613 -41.5 458 97.5 328 95.5Z" fill="#F9D923"/>
        </svg>
        <img src={Hamburguer1} alt="imagem ilustrativa" />
      </section>
      <section className="login-form">
        <LoginForm/>
      </section>
    </div>
  )
}

export default Login