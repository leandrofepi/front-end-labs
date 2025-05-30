const gitHubId = 
    document.querySelector('input[type=text]');
const btnBuscar = 
    document.querySelector('button');
//Token passado apenas para fins didáticos.
const headers = {
    
};
fetch('https://api.github.com/users/' 
    + 'juniorrxcx', {headers})
    .then(response => {
        if(response.ok){
            return response.json();
        }else {
            if(response.status === 404){
                alert('Usuário ' + gitHubId.value + ' não existe.');
                throw new Error('Usuário inexistente.');
            }else{
                alert('Erro de execução, tente mais tarde.');
                throw new Error('Erro de requisição');
            }
        }
    })
