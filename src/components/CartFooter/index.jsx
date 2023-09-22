import './style.scss';
const priceFormatter = new Intl.NumberFormat();

const CartFooter = ({ total }) => {
    const { price, count } = total;

    return (
        <>
            <footer className="cart-footer">
                <div className="cart-footer__count">{count} единицы</div>
                <div className="cart-footer__price">{priceFormatter.format(price)} руб.</div>
            </footer>
        </>
    );
}

export default CartFooter;