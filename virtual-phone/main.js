const display = 
    document.querySelector('input[type=tel]');

const teclas = 
    document.querySelectorAll('input[type=button]');

const limpar = document.querySelector('.icon');

limpar.onclick = () => {
    const opcao = confirm('Deseja mesmo limpar?');
    if (opcao) {
        display.value = "";
    }    
}

//Tarefinha: Criar uma condição para travar
//mais de 14 digitos
function valorTeclaToDisplay (i) {
    display.value += teclas[i].value;
}


for(let i = 0; i < teclas.length; i++){
    teclas[i].onclick = () => {
        valorTeclaToDisplay(i);
    }
}



