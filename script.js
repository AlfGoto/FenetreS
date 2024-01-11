document.addEventListener('DOMContentLoaded', () => {

    var windowName = 'default'

    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', (event) => {
        console.log('Connexion établie avec le serveur WebSocket');

        let sizeMSG = {
            request: 'size',
            y: window.innerHeight,
            x: window.innerWidth
        }
        socket.send(JSON.stringify(sizeMSG))
    });

    socket.addEventListener('message', (event) => {
        var msg = JSON.parse(event.data)
        console.log('message du WebSocket')
        console.log(msg);
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


    window.addEventListener('resize', () => {
        let sizeMSG = {
            request: 'size',
            y: window.innerHeight,
            x: window.innerWidth
        }
        socket.send(JSON.stringify(sizeMSG))
    })


})