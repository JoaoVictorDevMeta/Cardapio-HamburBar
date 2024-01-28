import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Swal from 'sweetalert2';

import {useNavigate} from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const createUserFormSchema = z.object({
  email: z.string()
  .min(1, 'Campo obrigatório')
  .email('Digite um e-mail válido'),
  password: z.string()
  .min(1, 'Campo obrigatório'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema> // definindo campos

function LoginForm() {

    const { 
        register, 
        handleSubmit, 
        formState: {errors} } 
        = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state:any) => state.user)

    function loginUser(data: any) {
        dispatch(signInStart());

        axios.post('/api/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            dispatch(signInSuccess(response.data));
            Swal.fire({
                title: 'Logado com sucesso',
                icon: 'success',
                confirmButtonText: 'Continuar',
            }).then(() => {
                navigate('/');
            })  
        }).catch(e => {
            dispatch(signInFailure(e))
            if (e.response.status == 401){
                Swal.fire({
                title: 'Falha ao logar-se',
                text: 'Email ou Senha podem estar incorretos',
                icon: 'error',
                confirmButtonText: 'Tentar Novamente',
                })
            } else {
                Swal.fire({
                title: 'Falha ao logar-se',
                text: 'Usuario ou email inexistente',
                icon: 'error',
                confirmButtonText: 'Tentar Novamente',
                })
            }
        })
    }


  return (
    <form
        onSubmit={handleSubmit(loginUser)}
    >
        <h1>Login</h1>

        <div className='login-input'>
            <label htmlFor="email">E-mail</label>
            <input 
              type="email"
              {...register('email')}
            />
            { errors.email && <span>{errors.email.message}</span> }
        </div>

        <div className='login-input'>
            <label htmlFor="password">Senha</label>
            <input 
              type="password"
              {...register('password')}
            />
            { errors.password && <span>{errors.password.message}</span> }
        </div>

        <button
            type="submit" 
        >{ loading ? 'Carregando...' : 'Logar' }</button>
    </form>
  )
}

export default LoginForm