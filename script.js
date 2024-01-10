document.addEventListener('DOMContentLoaded', () => {

    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', (event) => {
        console.log('Connexion établie avec le serveur WebSocket');

        socket.send('message random');
    });

    socket.addEventListener('message', (event) => {
        console.log('Message du serveur WebSocket:', event.data);
    });

    socket.addEventListener('close', (event) => {
        if (event.wasClean) {
            console.log('Connexion WebSocket fermée proprement, code:', event.code, 'raison:', event.reason);
        } else {
            console.error('Connexion WebSocket fermée de manière inattendue');
        }
    });

    socket.addEventListener('error', (error) => {
        console.error('Erreur de connexion WebSocket:', error);
    });
})