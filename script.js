var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});
document.getElementById('generos').value = data.select ? data.select : 1;

if(data.select){
    $('html, body').animate({ scrollTop: 700 }, 50);
}


async function fazGET(){
    let url = "http://api.themoviedb.org/3/movie/top_rated?api_key=e899b70ce4804f83aa10a6bdadbd24f1&language=pt-BR&page="+Math.random() * Math.floor((450 - 1) + 1)
    const dados = await fetch(url);
    const filmes = await dados.json();
    return filmes
}

function main(genre){

    let tabela = document.getElementById("projetos")
    var filmes =  fazGET()

    filmes.then(function(result){  
        result.results.forEach(element => {            
            if(genre.select != undefined && genre.select != 1){    
                element.genre_ids.forEach(elemento =>{
                    if (elemento == genre.select){
                        let linha = criarLinha(element);
                        tabela.append(linha);
                    } 
                })                                             
            }
            else{
                let linha = criarLinha(element);
                tabela.append(linha);
            }
        });
    })
}
function criarLinha(filme){
    let genero = ""
    filme.genre_ids.forEach(element => {
        switch (element) {
            case 28:
                genero += genero == "" ? "Ação" : ", Ação"
                break;
            case 12:
                genero += genero == "" ? "Aventura" : ", Aventura"
                break;
            case 35:
                genero += genero == "" ? "Comédia" : ", Comédia"
                break;
            case 99:
                genero += genero == "" ? "Documentário" : ", Documentário"
                break;
            case 18:
                genero += genero == "" ? "Drama" : ", Drama"
                break;
            case 16:
                genero += genero == "" ? "Animação" : ", Animação"
                break;
            default:
                genero = genero
          }
    })
    let limite = 200
    if(filme.overview.length>limite){ 
        limite--;
        last = filme.overview.substr(limite-1,1);
        while(last!=' ' && limite > 0){
            limite--;
            last = filme.overview.substr(limite-1,1);
        }
        last = filme.overview.substr(limite-2,1);
        if(last == ',' || last == ';'  || last == ':'){
            filme.overview = filme.overview.substr(0,limite-2) + '...';
        } else if(last == '.' || last == '?' || last == '!'){
            filme.overview = filme.overview.substr(0,limite-1);
        } else {
            filme.overview = filme.overview.substr(0,limite-1) + '...';
        }
    }

    html = '<div class="card">'
    html += '<div class="card-img-wrapper">'
    html +=  '<img src="https://image.tmdb.org/t/p/w500/'+filme.poster_path+'"alt="imagem do projeto ToDo" />'
    html +='</div>'
    html +='<div class="card-info">'
    html +=  '<h2 class="tamanho">'+filme.title+'</h2>'
    html +=  '<h3>'+genero+'</h3>'
    html +=  '<p>'+filme.overview+'</p>'
   // html +=  '<button class="btn">Saiba Mais</button>'
    html +='</div>'
    html +='</div>'
   // console.log(html)

    card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = html

    return card
}

$( "#carrega" ).click(function() {
    main(data);
  });

main(data);

