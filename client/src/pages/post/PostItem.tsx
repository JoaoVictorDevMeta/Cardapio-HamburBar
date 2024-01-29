import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { CompSelect } from '../../components/shared/Select';
import './PostItem.scss';

const createUserFormSchema = z.object({
  productName: z.string({
    invalid_type_error: "Nome deve ser um texto",
  })
  .min(1, 'Campo obrigatório'),
  price: z.string()
  .max(6, 'Preço muito alto')
  .min(1, 'Campo obrigatório')
  .includes(','),
  description: z.string({
    invalid_type_error: "Nome deve ser um texto",
  }),
  category: z.string({
    required_error: "Campo Obrigatório"
  })
})

type CreateUserFormData = z.infer<typeof createUserFormSchema> // definindo campos

function PostItem() {
  const fileRef = useRef(null);
  const { 
    register, 
    handleSubmit, 
    formState,
    control 
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });
  
  const {isValid, errors} = formState;

  const Options = [
    {value: 'hamburguer', label: 'hamburguer'},
    {value: 'acompanhamento', label: 'acompanhamento'},
    {value: 'bebida', label: 'bebida'},
    {value: 'combos', label: 'combos'},
  ] 

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <section className='postItem'>
      
        <svg xmlns="http://www.w3.org/2000/svg" width="830" height="525" viewBox="0 0 830 525" fill="none">
          <path d="M9.99988 110C-19.5001 200.5 30.9999 574.5 30.9999 574.5L829.5 560.5C829.5 560.5 492.5 510 387.5 414C282.5 318 349 143 289.5 47C230 -49 39.4999 19.5 9.99988 110Z" fill="#F9D923"/>
        </svg>    

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="item-container">
          <div className="row-top">
            <div className='image-input'>
              <input type="file" ref={fileRef} hidden accept='image/*'/>
              <img 
                src="" 
                alt=""
                onClick={() => (fileRef.current as HTMLInputElement | null)?.click()} 
              />
            </div>
            <div className='inputs'>
              <div className="input-item nome">
                <label htmlFor="">Nome do Produto</label>
                <input 
                  type="text" 
                  {...register('productName')}
                />
                { errors.productName && <span>{errors.productName.message}</span> }
              </div>

              <div className="input-item price">
                <label htmlFor="">Preço</label>
                <input 
                  type="text" 
                  {...register('price')}
                />
                { errors.price && <span>{errors.price.message}</span> }
              </div>

              <div className='input-item categ'>
                <label htmlFor="">Categoria</label>
                <CompSelect control={control} name="category" options={Options}/>
                { errors.category && <span>{errors.category.message}</span> }
              </div>
            </div>
          </div>
          <div className="row-bottom">
            <label htmlFor="">Descrição do produto</label>
            <textarea 
              maxLength={200}
              {...register('description')}
            ></textarea>
            { errors.description && <span>{errors.description.message}</span> }
          </div>
        </div>

        <div className="confirm ">
          <h2>Adicionar Item ao Menu</h2>
          <p>Descrição não é obrigatória</p>
          <button
            type='submit'
            disabled={!isValid}
          >Adicionar</button>
        </div>
      </form>
    </section>
  )
}

export default PostItem