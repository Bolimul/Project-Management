import { useEffect } from "react"
import { db, auth } from "./firebase"
import { getDoc, collection, query, where, getDocs, doc} from "firebase/firestore"


export const FollowingUsers = (props) => 
{
    var theUsers = [
        {FirstName: "Maya", LastName: "Rosenberg"},
        {FirstName: "Nikita", LastName: "Solonets"},
        {FirstName: "Ilan", LastName: "Shklover"}
    ]

    return(
        <div>
            {theUsers.map((friend) => (
            <li key={friend.id}>
              <button>{`${friend.FirstName} ${friend.LastName}`}</button>
            </li>
          ))}
        </div>
    )
}
export default FollowingUsers;