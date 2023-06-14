export interface IOrder  {
    "id": number
    "date": string,
    "address": {
        "name": string
        "surname": string,
        "street": string
        "city": string
        "postcode": string
    },
    "price": string
    "products": [
        {
            "imgSrc": string
            "title": string
        }
    ]
}