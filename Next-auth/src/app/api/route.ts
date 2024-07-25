import { getAllUsers } from "../lib/api"

export function GET(req:Request){
    const users = getAllUsers()
    return Response.json({users})
}