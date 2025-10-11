import user from "./user.js";

let socket = new WebSocket("ws://localhost:3001");

socket.onopen = function (e) {
    socket.send(JSON.stringify({method: 'connection', user}));
    console.log("Connection established", e);
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

export default {
    send: function (obj) {
        socket.send(JSON.stringify(obj));
        console.log(`onsend: ${JSON.stringify(obj)}`);
    },

    receive: callback =>
        event => {
            const message = JSON.parse(event.data);
            callback(message);
            console.log(`onmessage: ${event.data}`);
        }
};

