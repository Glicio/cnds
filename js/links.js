let btnpj = document.getElementById("btn-pj")
let btnpf = document.getElementById("btn-pf")
let pf = document.getElementById("pf")
let pj = document.getElementById("pj")

btnpj.addEventListener('click',function(){ativar("pj")})
btnpf.addEventListener('click',function(){ativar("pf")})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function ativar(item){
    pf.setAttribute("style","display: none;")
    pj.setAttribute("style","display: none;")
    item = document.getElementById(item)
    if(item.dataset.ativado == "false"){
        item.setAttribute('style', 'display: flex; flex-direction: column;')
        await sleep(40)
        item.setAttribute('style', 'display: flex; flex-direction: column; opacity: 1;')
        item.dataset.ativado = "true"
    }else{
        item.setAttribute('style', 'display: flex; flex-direction: column;')
        await sleep(300)
        item.setAttribute('style', 'display: none; opacity: 0;')
        item.dataset.ativado = "false"
    }
}