import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { app } from '../../firebase';
import axios from 'axios';
import Swal from 'sweetalert2';

import { CompSelect } from '../../components/shared/Select';
import { createUserFormSchema, UserFormData } from '../../schema/UserFormSchema';
import { signInStart, loadSuccess } from '../../redux/user/userSlice';
import { Options } from '../post/options/Options';
import '../post/PostItem.scss';

interface item {
  title: string,
  price: string,
  description: string,
  tipo: string,
  image: string,
  imageDesc : string
}

function PostItem() {
  const fileRef = useRef(null);
  const [ image, setImage ] = useState<File | undefined>(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [formData, setFormData] = useState<{ profilePicture?: string }>({});
  const [fileError, setFileError] = useState(false);
  const { loading } = useSelector((state:any) => state.user);
  const [ item, setItem ] = useState<item>({
    title: "",
    price: "",
    description: "",
    tipo: "",
    image: "",
    imageDesc: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`/api/items/item/${id}`)
    .then(response =>{
      setItem(response.data)
    })
  }, [])

  const { 
    register, 
    watch, 
    handleSubmit,
    formState,
    control 
  } = useForm<UserFormData>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onBlur"
  });
  const {isValid, errors} = formState;

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async(image:File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
    },
    () => {
      setFileError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL:string) => {
        const updatedFormData = { ...formData, profilePicture: downloadURL };
        setFormData(updatedFormData);
    });
    });
  }

  const handleChange = (e:any) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const category = watch('category');
  useEffect(() => {
    setFormData(prev => ({ ...prev, category }));
  }, [category]);

  const postItem = async () => {
    dispatch(signInStart());

    axios.post(`/api/items/edititem`, {...formData, id: id}, {
      withCredentials: true,
    }).then((response) => {
        dispatch(loadSuccess());
        Swal.fire({
            title: response.data,
            icon: 'success',
            confirmButtonText: 'Continuar',
        }).then(() => {
            navigate('/profile');
        })  
    }).catch(() => {
        dispatch(loadSuccess())
        Swal.fire({
        title: 'algo deu errado',
        icon: 'error',
        confirmButtonText: 'Tentar Novamente',
        })       
    })
  };
  
  const SvgPath = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="830" height="525" viewBox="0 0 830 525" fill="none">
      <path d="M9.99988 110C-19.5001 200.5 30.9999 574.5 30.9999 574.5L829.5 560.5C829.5 560.5 492.5 510 387.5 414C282.5 318 349 143 289.5 47C230 -49 39.4999 19.5 9.99988 110Z" fill="#F9D923"/>
    </svg>
  );

  return (
    <section className='postItem'>
      <SvgPath />   

      <form
        onSubmit={handleSubmit(postItem)}
      >
        <div className="item-container">
          <div className="row-top">
            <div className='image-input'>
              <input 
                type="file" 
                ref={fileRef} 
                hidden 
                accept='image/*'
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <img 
                src={ formData.profilePicture ? formData.profilePicture : (item.image && item.image.length > 1) ? item.image : 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/12/hamburguer-unsplash.jpg?w=1200&h=1200&crop=1'}
                alt="Product_Image_Input"
                onClick={() => (fileRef.current as HTMLInputElement | null)?.click()} 
              />
              { fileError ? ( <span>something went wrong</span> ) 
                : filePercent > 0 && filePercent < 100 ? ( <span>{ `Carregando ${filePercent}%` }</span>) 
                : filePercent === 100 ? (<span>Image updated sucefully</span>) 
                : ''
              }
            </div>
            <div className='inputs'>
              <div className="input-item nome">
                <label htmlFor="">Nome do Produto</label>
                <input 
                  id='productName'
                  defaultValue={item.title}
                  type="text" 
                  {...register('productName')}
                  onChange={handleChange}
                />
                { errors.productName && <span>{errors.productName.message}</span> }
              </div>

              <div className="input-item price">
                <label htmlFor="">Preço</label>
                <input 
                  id='price'
                  defaultValue={item.price}
                  type="text" 
                  {...register('price')}
                  onChange={handleChange}
                />
                { errors.price && <span>{errors.price.message}</span> }
              </div>

              <div className='input-item categ'>
                <label htmlFor="">Categoria</label>
                <CompSelect control={control} name="category" options={Options} item={""}/>
                { errors.category && <span>{errors.category.message}</span> }
              </div>
            </div>
          </div>
          <div className="row-bottom">
            <label htmlFor="">Descrição do produto</label>
            <textarea 
              id="description"
              defaultValue={item.description}
              maxLength={200}
              {...register('description')}
              onChange={handleChange}
            ></textarea>
            { errors.description && <span>{errors.description.message}</span> }
          </div>
        </div>

        <div className="confirm ">
          <h2>Editar Item</h2>
          <p>Lembre de manter as regras dos campos</p>
          <button
            type='submit'
            disabled={!isValid}
          >{ loading ? 'Carregando...' : 'Finalizar' }</button>
        </div>
      </form>
    </section>
  )
}

export default PostItem