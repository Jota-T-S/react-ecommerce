import { Link, useSearchParams } from 'react-router-dom';
import { useWhisListContext } from '../../../context/WhisList/WhisListContext'; 
import { ProductWhis } from '../ProductWhis/ProductWhis';
import iconHeart from '../../../assets/icons/heart.png';
import './ProductList.css';

export const ProductWhisList = () => {
    const { whis } = useWhisListContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('q') ?? '';

    const handleInput = ({ target }) => {
        const { value } = target;
        setSearchParams({ q : value });
    } 

    if(whis.length === 0){
        return(
            <div className='section-noWish'>
                <div className='parrafo-heart'>
                    <p> Give love to the products </p>
                    <img src={ iconHeart } alt="icon heart" width="30" height="27"/>
                </div>
                <div className='link-explore'>
                    <Link to='/shop'> Explore articles </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="input-search">
            <div className="input-wraper">
                    <input type="search" value={ query } name="filter" placeholder="Search" onChange={ handleInput }/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="layaout-product-shop">
                {whis
                .filter(({ name }) => {
                    if(!query) return true
                    else {
                        const nameLowerCase = name.toLowerCase()
                        return nameLowerCase.includes(query.toLowerCase())
                    }
                })
                .map((product) => {
                    return (
                        <ProductWhis key={ product.id } product={ product } />
                        )
                    })
                }
            </div>
        </>
    )

}