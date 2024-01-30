type MenuItems = {
    title: string
    description: string
    image: string
    imageDesc: string
    price: number
}

function Container({ title, description, image, imageDesc, price }:MenuItems) {

    /*function handleDelete(id:number){
        axios.post('/api/items/deleteitem', {id: id},{
            withCredentials: true,
        }).then(response =>{
            console.log(response.data)
         })
    }*/

  return <a>
        <img height="110" src={(image && image.length > 7) ? image : "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/12/hamburguer-unsplash.jpg?w=1200&h=1200&crop=1"} alt={imageDesc + image} />
        <div className="text">
            <h6>
                {title}
            </h6>
            <p>
                {description}
            </p>
            <h5>
                R${price}
            </h5>
        </div>
    </a> 
}

export default Container