import axios from 'axios';
import { useEffect, useState } from "react";

const useCart = ({cartItem}) => {

    const [selectItem, setSelectItem] = useState([]);

    useEffect(()=>{

        const getProducts = async() => {
            const url = 'https://protected-dawn-66498.herokuapp.com/selectitem'
            const {data} = await axios.get(url)
            setSelectItem(data);
        }
        getProducts();

    }, [cartItem]);

    return {selectItem, setSelectItem};
}
export default useCart;

