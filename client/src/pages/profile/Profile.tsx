import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import { signOut } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogout(){
        await axios.get('http://localhost:5000/api/auth/logout')
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

  return (
    <div>
        Profile
        <h6 onClick={handleLogout}>Sair</h6>    
    </div>
  )
}

export default Profile