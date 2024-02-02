type MenuItems = {
    title: string
    description: string
    image: string
    imageDesc: string
    price: number
}

function Container({ title, description, image, imageDesc, price }:MenuItems) {

  return <a>
        <div className="image">
            <img height="110" src={(image && image.length > 7) ? image : "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/12/hamburguer-unsplash.jpg?w=1200&h=1200&crop=1"} alt={imageDesc + image} />
        </div>
        <div className="text">
            <h6>
                {title}
            </h6>
            <p>
                {description}
            </p>
            <h5>
                {price}
            </h5>
        </div>
    </a> 
}

export default Container