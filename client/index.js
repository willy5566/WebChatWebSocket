var ws;
const PORT = 3000;
const IP = '10.10.60.148';

document.querySelector('#connect')?.addEventListener('click', e => {
    console.log('[click connect');
    connect();
});

document.querySelector('#disconnect')?.addEventListener('click', e => {
    console.log('[click disconnect]');
    disconnect();
});

document.querySelector('#sendBtn')?.addEventListener('click', e => {
    const msg = document.querySelector('#sendMsg');
    sendMessage(msg?.value);
});

function connect() {
    ws = new WebSocket(`ws://${IP}:${PORT}`);
    ws.onopen = () => {
        console.log('[open connection]');
        ws.onmessage = event => { 
            console.log(`[Message from server]: \n %c${event.data}`, 'color: blue');
         }
    }    
}

function disconnect() {
    ws.close();
    ws.onclose = () => console.log('[close connection]');
}

function sendMessage(msg) {
    ws.send(msg);    
}