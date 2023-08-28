import { useEffect, useState } from "react";
import {getProducts} from "../../../../services/apiCalls";
import {IProduct} from "../../../../interfaces/IProduct";
import useAuth from "../../../../context/hooks/useAuth";
interface IUseProduct {
    products: IProduct[];
    isLoading: boolean;
    error: string|null;
}

export const useProducts = (): IUseProduct => {
    const {user} = useAuth();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getJwToken = (): string => {
        return user?.token || '';
    }

    useEffect(() => {
        setProducts([]);
        setIsLoading(true);
        setError(null);

        getProducts(getJwToken())
            .then(data => setProducts(data))
            .catch(err => setError('Coś poszło nie tak'))
            .finally(() => setIsLoading(false))
    }, []);

    return {products, isLoading, error} as IUseProduct
}