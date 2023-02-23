let products;
let categorias;
let maps;

document.addEventListener("DOMContentLoaded", async() => {
    await CargarData();
    MostrarProductos();
    MostrarCategorias();
    InitMap(); 

    document.getElementById("btn-burzaco").addEventListener('click', () => handlerMap('burzaco')) 
    document.getElementById("btn-solano").addEventListener('click', () => handlerMap('solano')) 

    setTimeout(() => {
        document.querySelector("#banner-wpp").style.opacity = "0"
    },4000)
});

const CargarData = async() => {
    await fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            products = data.products
            categorias = data.categorias        
            maps = data.maps;    
        })
        .catch(error => console.log(error));
}

async function MostrarProductos(idCategoria = null){
    const productsContainer = document.getElementById("products");    
    productsContainer.innerHTML = '';
    
    products.forEach( item => {        
        if(idCategoria != null){
            if(item.categoria != idCategoria){
                return;
            }
        }
        else{            
            if(item.categoria != 1){
                return;
            }
        }            
        
        let div = document.createElement("div");                
        let img = document.createElement("img");
        let h4 = document.createElement("h4");
        let p = document.createElement("p");

        div.setAttribute("id",`product-active`);
        img.setAttribute("src",`${item.image}`);
        img.classList.add("img-product")
        h4.innerText = `${item.nombre}`            
        p.innerHTML = `${item.descripcion}<br><strong>${item.precio}</strong>`                

        div.appendChild(img)
        div.appendChild(h4)
        div.appendChild(p)
        
        productsContainer.appendChild(div)    
    })    
}

function MostrarCategorias(){
    const categoriasContainer = document.getElementById("lista-categorias");    
    
    categorias.forEach( item => {
        let btn = document.createElement("button");        
        btn.classList.add("list-group-item")
        btn.classList.add("list-group-item-action")
        btn.innerText = `${item.nombre}` 
        console.log(item.id)                   
        btn.addEventListener('click',(e) => handlerCategoria(e, item.id))

        categoriasContainer.appendChild(btn)    
    })
}

function handlerCategoria(event, idCategoria)
{
    let active = document.querySelector(".list-group-item.list-group-item-action.active")    
    active ? active.classList.remove("active") : null;

    event.target.classList.add("active")
    MostrarProductos(idCategoria)
}

function InitMap() 
{
  document.getElementById("map").innerHTML = maps.burzaco 
}

function handlerMap(local){
    const map = document.getElementById("map")
    switch(local){
        case 'burzaco':
            map.innerHTML = maps.burzaco 
            document.getElementById("btn-solano").classList.remove('active')
            document.getElementById("btn-burzaco").classList.add('active')
            break;
        case 'solano':
            document.getElementById("btn-solano").classList.add('active')
            document.getElementById("btn-burzaco").classList.remove('active')
            map.innerHTML = maps.solano
            break;        
    }
}