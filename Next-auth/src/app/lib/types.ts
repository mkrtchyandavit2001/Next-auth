export interface IUser{
    id: string
    name:string
    surname:string
    login:string
    password:string
}

export type OptionalUser = Partial<IUser>