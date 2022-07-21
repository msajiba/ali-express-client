import axios from 'axios';
import { useEffect, useState } from "react";

const useCart = ({cartItem}) => {

    const [selectItem, setSelectItem] = useState([]);

    useEffect(()=>{

        const getProducts = async() => {
            const url = 'http://localhost:5000/selectitem'
            const {data} = await axios.get(url)
            setSelectItem(data);
        }
        getProducts();

    }, [cartItem]);

    return {selectItem, setSelectItem};
}
export default useCart;

