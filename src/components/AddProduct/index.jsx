import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

const AddProduct = ({ title, onClick }) => {
    return (
        <button className="btn btn-outline-primary btn-sm mb-10"
            onClick={onClick}
        >{title}</button>
    );
}

export default AddProduct;