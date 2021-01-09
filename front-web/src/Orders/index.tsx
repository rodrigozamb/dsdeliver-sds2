import './styles.css'
import StepsHeader from './StepsHeader';
import ProductsList from './ProductsList';
import { useEffect, useState } from 'react';
import { OrderLocationData, Product } from './types';
import { fetchProducts, saveOrder } from '../api';
import OrderLocation from './OrderLocation';
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';
import { toast } from 'react-toastify'


function Orders(){

    const [products,setProducts] = useState<Product[]>([]);
    const [selectedProducts,setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation,setOrderLocation] = useState<OrderLocationData>();

    const totalPrice = selectedProducts.reduce((sum,item) => {
        return sum + item.price;
    },0);
    
    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected =  checkIsSelected(selectedProducts,product);
    
        if (isAlreadySelected) {
        const selected = selectedProducts.filter(item => item.id !== product.id);
        setSelectedProducts(selected);
        } else {
        setSelectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
          ...orderLocation!,
          products: productsIds
        }
      
        saveOrder(payload).then((res) => {
          toast.error(`Pedido enviado com sucesso! N° ${res.data.id}`);
          setSelectedProducts([]);
        })
          .catch(() => {
            toast.warning('Erro ao enviar pedido');
          })
      }

    console.log(products);
    useEffect(()=>{
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error));
    },[]);

    return(
        <>
            <div className="orders-container">
                <StepsHeader></StepsHeader>
                <ProductsList 
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                />
                <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
                <OrderSummary 
                    amount={selectedProducts.length}
                    totalPrice={totalPrice}
                    onSumit={handleSubmit}
                />
            </div>
            <Footer></Footer>
        </>
    )

}


export default Orders;