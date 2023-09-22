import './style.scss';
import priceFormatter from '../../utils/priceFormatter';
import Count from '../Count';
import ButtonDelete from '../ButtonDelete';


const Product = ({ product }) => {

    const { id, img, title, priceTotal, count } = product;

    return (
        <>
            <section className="product" >
                <div className="product__img"><img src={`./img/products/${img}`} alt={title} /></div>
                <div className="product__title">{title}</div>

                <Count id={id} count={count} />

                <div className="product__price">{priceFormatter.format(priceTotal)} руб.</div>
                <div className="product__controls">
                    <ButtonDelete id={id} />
                </div>
            </section>
        </>
    );
}

export default Product;