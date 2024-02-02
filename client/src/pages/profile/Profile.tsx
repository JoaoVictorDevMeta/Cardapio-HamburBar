import axios from "axios";
import Swal from "sweetalert2";
import { signOut } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

import MenuItem from "../../components/shared/MenuItem";
import { IoTrashBin } from "react-icons/io5";
import './Profile.scss'

function Profile() {
    const dispatch = useDispatch();
    const [menus, setMenus] = useState<any[]>([]);
    const {currentUser} = useSelector((state:any) => state.user);

    async function handleLogout(){
        await axios.get('/api/auth/logout')
        .then(() => {
            dispatch(signOut());
        })
        .catch(e => {
            Swal.fire({
                title: 'Algo deu errado',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Vou contactar o Suporte',
            })
        });
    }

    useEffect(() => {
        axios.get(`/api/items/user/${currentUser.id}`, {
            withCredentials: true,
        })
        .then(response => {
            setMenus(response.data);
        })
    }, [])

    const handleDelete = async (id: number) => {
        Swal.fire({
            icon: 'question',
            text: 'Tem certeza que deseja excluir o Item',
            showCancelButton: true,
            cancelButtonColor: '#DD6B55',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then( async (isConfirm)=>{
            if(isConfirm.value){
                try {
                    await axios.post('/api/items/deleteitem', { id: id }, { withCredentials: true })
                    .then(() => {
                        Swal.fire({
                            title: 'Deletado com sucesso',
                            icon: 'success',
                            confirmButtonText: 'Continuar',
                        })  
                    }).catch(() => {
                        Swal.fire({
                            title: 'Algo deu errado',
                            icon: 'error',
                            confirmButtonText: 'Tentar Novamente',
                        })
                    });
                    setMenus(menus.filter(item => item.id !== id));
                } catch (error) {
                    console.error(error);
                }
            } else {
                Swal.fire({
                    title: 'Cancelado',
                    confirmButtonText: 'Continuar',
                }) 
            }
        })  
    };

  return (
    <section className="profile-section">
        <div className="profile">
            <div className="info-user">
                <img src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png" alt="DefaultImage" />
                <h2>
                    {currentUser.name}
                </h2>
                <p>
                    {currentUser.email}
                </p>
            </div>
            <h5 onClick={handleLogout}>
                Logout
            </h5>
        </div>
        <div className="profile-itens">
            <h1>Itens Adicionados</h1>
            <ul>
                {menus.map(item => (
                    <li className="container-item" key={item.id}>
                        <MenuItem {...item}/>
                        <button onClick={() => handleDelete(item.id)}><IoTrashBin /></button>
                        <Link to={`/edititem/${item.id}`} className="editLink">Edit</Link>
                    </li>
                ))}
            </ul>

        </div>
        <div className="profile-actions">
            <h1>
                Cardápio
            </h1>
            <ul>
                <li>
                    <Link to='/postItem'>Adicionar Item</Link>
                </li>
                <li>
                    <Link to='#'>Aplicar Desconto</Link>
                </li>
                <li>
                    <Link to='#'>Remover Desconto</Link>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Profile