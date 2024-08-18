import {Wrapper} from "./Contacts.style";


function Contacts({contacts}) {
    return (
        <Wrapper>
            {contacts.map((user, index) =>  <div key={index + user.name}>{user.name}</div>)}
        </Wrapper>
    )
}

export default Contacts;