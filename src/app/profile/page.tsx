import { IUser } from "../lib/types"

interface IProps{
    user:IUser
}

export default function Page ({user}: IProps){
    return<>
        <h1 className="is-size-1">Profile</h1>
        <h2>{user?.name}</h2>
        <h2>{user?.surname}</h2>
    </>
}