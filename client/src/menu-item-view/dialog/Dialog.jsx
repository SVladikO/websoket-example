import {useState, useEffect} from 'react';
import Messages from "../../components/Messages/Messages";
import Contacts from "../../components/Contacts/Contacts";
import MessageInput from "../../components/MessageInput/MessageInput";
import {Wrapper, MessageWrapper, SingIn, Columns} from './Dialog.style';

const METHOD = {
    CONNECTION: 'connection',
    MESSAGE: 'message',
}

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getId = () => `${getRandom(1000, 10000)}_${getRandom(1000, 10000)}`

const getDefaultUser = () => {
    const date = new Date();
    const id = getId();
    const username = `YourName_${id}`;

    return {
        id,
        name: username
    }
}

function Dialog() {
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(getDefaultUser())

    const startChat = () => {

        let socket = new WebSocket("ws://localhost:3001");

        socket.onopen = function (e) {
            const date = new Date().getTime();
            socket.send(JSON.stringify({method: METHOD.CONNECTION, user}));

            console.log("Connection established", e);
        };

        socket.onmessage = function (event) {
            console.log(`onmessage: ${event.data}`);
            const message = JSON.parse(event.data);

            switch (message.method) {
                case METHOD.CONNECTION:
                    contacts.push(message.user)
                    setContacts([...contacts])
                    break;
                case METHOD.MESSAGE:
                    messages.push(message)
                    setMessages([...messages])
            }

        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                alert('Connection died');
            }
        };

        socket.onerror = function (error) {
            console.log(`[error]`);
        };

        document.forms.publish.onsubmit = function () {
            let message = this.message.value;
            const username = document.getElementById('username').value;
            const date = new Date().getTime();
            socket.send(JSON.stringify({username, message, date, method: METHOD.MESSAGE}));
            this.message.value = ''
            return false;
        };
    }

    useEffect(startChat, [])

    return (
        <Wrapper>
            {/*{!showChat && <SingIn>*/}
            {/*    <input*/}
            {/*        id={'username'}*/}
            {/*        value={user.name}*/}
            {/*        onChange={e => setUser({...user, name: e.target.value})}*/}
            {/*    />*/}
            {/*    <button onClick={() => setShowChat(true)}>Start chat</button>*/}
            {/*</SingIn>*/}
            {/*}*/}

            <Columns>
                <Contacts contacts={contacts}/>
                <MessageWrapper>
                    <Messages messages={messages}/>
                    <MessageInput/>
                </MessageWrapper>
                <div>
                    <input
                        id={'username'}
                        value={user.name}
                        onChange={e => setUser({...user, name: e.target.value})}
                    />
                </div>
            </Columns>
        </Wrapper>
    )
}

export default Dialog;