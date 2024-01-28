import {useState, useEffect} from 'react';
import axios from 'axios';
import MenuItem from '../shared/MenuItem';

import './MenuContainer.scss'

interface MyItems {
    titulo: string;
    imagem: string;
    categoria: string;
    lado: boolean;
}

function MenuContainer({ titulo, imagem, categoria, lado }: MyItems) {
    const [menus, setMenus] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/items/${categoria}`)
        .then(response => {
            setMenus(response.data);
        })
    }, []);

  return (
        <div className={'menu-component '+ (lado && 'side') } >
            <img src={imagem} alt='Imagem Ilustrativa Combos'></img>

            <div className='component-side'>
                <h3>{titulo}</h3>

                <div className='component-container'>
                    {menus.map(item => (
                        <div className="container-item" key={(item as any).id}>
                            <MenuItem {...item as any} isActive={false} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

  )
}

export default MenuContainer