import {useState, useEffect} from 'react';
import Messages from "../Messages/Messages";
import Contacts from "../Contacts/Contacts";
import MessageInput from "../MessageInput/MessageInput";
import {Wrapper, MessageWrapper, Columns} from './Dialog.style';

import user from "../../user.js";
import socket from '../../service.js';

function Dialog() {
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])


    const initChat = () => {

    }

    useEffect(initChat, [])

    return (
        <Wrapper>
            <Columns>
                <Contacts contacts={contacts}/>
                <MessageWrapper>
                    <Messages messages={messages}/>
                    <button click={onClickSend}>Send</button>
                </MessageWrapper>
                <div className={'Username'} style={{color: 'red', border: 'solid 2px blue'}}>Current
                    user: {user.name}
                </div>
            </Columns>
        </Wrapper>
    )
}

export default Dialog;