async function GETDetails(){
    let url = "http://api.themoviedb.org/3/movie/11217?api_key=e899b70ce4804f83aa10a6bdadbd24f1&language=pt-BR"
    const dados = await fetch(url);
    const filme = await dados.json();
    return filme
}

function main(){
    var filme = GETDetails()
    filme.then(function(result){  
        console.log("a")
        $(".banner").attr("src","https://image.tmdb.org/t/p/w500/"+result.backdrop_path)
    });

}

main();
