// Manipular a seleção do ficheiro ISO e injetar na memória do emulador
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('file-name').innerText = file.name;
        console.log("A carregar ISO para o motor:", file.name);

        const reader = new FileReader();
        reader.onload = function(e) {
            const byteArray = new Uint8Array(e.target.result);
            
            try {
                // Injeta o ficheiro diretamente na memória virtual do Emscripten (Play!)
                if (typeof Module !== 'undefined' && Module.FS) {
                    Module.FS.createDataFile('/', 'game.iso', byteArray, true, true);
                    console.log("ISO injetada com sucesso na memória do emulador!");
                    alert("Jogo carregado para o motor com sucesso! Podes iniciar a emulação.");
                } else {
                    console.warn("O motor ainda não carregou o módulo completamente.");
                    alert("Ficheiro lido, mas aguarde o motor carregar totalmente.");
                }
            } catch (error) {
                console.error("Erro ao injetar o ficheiro na memória:", error);
            }
        };
        reader.readAsArrayBuffer(file);
    }
}

// Detetar comandos de Gamepad em tempo real
window.addEventListener("gamepadconnected", (e) => {
    const gamepadText = document.getElementById('gamepad-text');
    gamepadText.innerText = `Comando Conectado: ${e.gamepad.id}`;
    gamepadText.style.color = "#34d399"; // Verde indicador de sucesso
    console.log("Gamepad conectado:", e.gamepad);
});

window.addEventListener("gamepaddisconnected", (e) => {
    const gamepadText = document.getElementById('gamepad-text');
    gamepadText.innerText = "Comando: Desconectado";
    gamepadText.style.color = "#9ca3af";
    console.log("Gamepad desconectado");
});

// Aplicar ajustes do painel lateral
function applySettings() {
    const quality = document.getElementById('graphics-quality').value;
    const fps = document.getElementById('fps-limit').value;
    alert(`Configurações aplicadas!\nGráficos: ${quality}\nFPS: ${fps}`);
}

// Alternar Modo de Tela Cheia
function toggleFullScreen() {
    const screen = document.getElementById('emulator-screen');
    if (!document.fullscreenElement) {
        screen.requestFullscreen().catch(err => {
            alert(`Erro ao tentar tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}
