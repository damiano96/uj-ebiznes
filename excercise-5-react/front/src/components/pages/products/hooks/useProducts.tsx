import { useEffect, useState } from "react";
import {getProducts} from "../../../../services/apiCalls";
import {IProduct} from "../../../../interfaces/IProduct";
interface IUseProduct {
    products: IProduct[];
    isLoading: boolean;
    error: string|null;
}

export const useProducts = (): IUseProduct => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setProducts([]);
        setIsLoading(true);
        setError(null);

        getProducts()
            .then(data => setProducts(data))
            .catch(err => setError('Coś poszło nie tak'))
            .finally(() => setIsLoading(false))
    }, []);

    return {products, isLoading, error} as IUseProduct
}