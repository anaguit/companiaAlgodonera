window.addEventListener("load",function(){
    let botonBuscadorcito = document.querySelector(".botonBuscadorcito")
    botonBuscadorcito.addEventListener("click",function(){
        let buscadorcito = document.querySelector(".buscadorcito")
        buscadorcito.style.display = "none"

        let buscador = document.querySelector(".buscador")
        buscador.style.display = "flex"
        buscador.style.flexDirection = "column"
    })
})