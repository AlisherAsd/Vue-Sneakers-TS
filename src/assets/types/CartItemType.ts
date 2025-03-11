export interface IProps {
    id: number
    title: string
    price: number
    imageUrl: string
}

export interface IFavoriteProps {
    id: number
    title: string
    price: number
    imageUrl: string
    isFavorite: boolean
    isAdded: boolean
}