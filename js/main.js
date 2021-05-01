let tipos = ["01","10","33","37","43","99","ex","f","d"]
let tipoInput = document.getElementById("tipo");
let valorInput = document.getElementById("valor");
let editando = false;

function resetar(){
    location.reload();
    return false;
}
var formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

function formatarNumero(el){
    valor = el.target.value
    valor = valor.replace(".","")
    vl = valor.length
    valor = valor.substring(0, valor.length-2)+"."+valor.substring(valor.length-2,valor.length);
    el.target.value = valor;
}
function checkNumero(e){
    //console.log(e.key == "Backspace");
    if(!/^([0-9])$/.test(e.key) && e.key != "Backspace" && e.key !="Tab" && e.key !="Enter"){
        console.log("FALSE");
        e.preventDefault();
        return false;
    }
}
function valorValidate(e){
    console.log(e.target.value.length);
    if(e.target.value.length > 1 && e.key != "Backspace" && e.key != "Tab"){
        e.preventDefault();
        return false;
    }
}
function nextInput(e){
    if(e.target.value.length == 2){
        valorInput.focus();
    }
}
tipoInput.addEventListener('keydown', valorValidate);
tipoInput.addEventListener('keyup', nextInput);
valorInput.addEventListener('keydown', checkNumero);
valorInput.addEventListener('keyup', formatarNumero);
function onFormSubmit(){
    tipo = getFormData().tipo;
    valor = getFormData().valor;

    if(tipos.includes(tipo)){
        insertData(getFormData())
    }else{
        alert("tipo inválido")
    }
    tipoInput.focus();
    tipoInput.value = "";
    valorInput.value = "";
}
function getFormData(){
    var formData = {};
    formData["tipo"] = document.getElementById("tipo").value;
    formData["valor"] = document.getElementById("valor").value;
    return formData;
}
function insertData(data){
    table = document.getElementById("list").getElementsByTagName("tbody")[0];
        newrow = table.insertRow(table.length);
        cell1 = newrow.insertCell(0);
        cell1.innerHTML = data.tipo;
        cell2 = newrow.insertCell(1);
        cell2.innerHTML = data.valor;
        cell3 = newrow.insertCell(2);
        cell3.innerHTML = '<a onClick="onEdit(this)">Editar</a><a onClick="onRemove(this)">Remover</a>'
        atualizarResultado();
}
function atualizarResultado(){
    table = document.getElementById("list").getElementsByTagName("tbody")[0];
    resultado = document.getElementById("resultado").getElementsByTagName("tbody")[0];
    detalhes = document.getElementById("detalhes").getElementsByTagName("tbody")[0];
    let salarios = 0;
    let insalubridade = 0;
    let gratificacoes = 0;
    let quinquenio = 0;
    let decimo = 0;
    let outros = 0;
    let extra = 0;
    let faltas = 0;
    let descontos = 0;
    for(let i = 0; i< table.rows.length; i++){
        switch(table.rows[i].cells[0].innerText){
            case '01':
                salarios += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case '10':
                insalubridade += parseFloat(table.rows[i].cells[1].innerText)
                break;
            case '33':
                gratificacoes += parseFloat(table.rows[i].cells[1].innerText)
                break;
            case '37':
                quinquenio += parseFloat(table.rows[i].cells[1].innerText)
                break;
            case '43':
                decimo += parseFloat(table.rows[i].cells[1].innerText)
                break;
            case '99':
                outros += parseFloat(table.rows[i].cells[1].innerText)
                break;
            case 'ex':
                extra += parseFloat(table.rows[i].cells[1].innerText)
                break;
            case 'f':
                faltas += parseFloat(table.rows[i].cells[1].innerText);
                salarios -= parseFloat(table.rows[i].cells[1].innerText);
                if(descontos > faltas){
                    descontos -= parseFloat(table.rows[i].cells[1].innerText);
                }
                break;
            case 'd':
                descontos += parseFloat(table.rows[i].cells[1].innerText);
        }
    }
    let liquidoPago = salarios+insalubridade+gratificacoes+quinquenio+decimo+outros-descontos;
    resultado.rows[0].cells[1].innerText = formatter.format(salarios.toFixed(2));
    resultado.rows[1].cells[1].innerText = formatter.format(insalubridade.toFixed(2)); 
    resultado.rows[2].cells[1].innerText = formatter.format(gratificacoes.toFixed(2)); 
    resultado.rows[3].cells[1].innerText = formatter.format(quinquenio.toFixed(2)); 
    resultado.rows[4].cells[1].innerText = formatter.format(decimo.toFixed(2)); 
    resultado.rows[5].cells[1].innerText = formatter.format(outros.toFixed(2)); 
    resultado.rows[6].cells[1].innerText = formatter.format(extra.toFixed(2));
    detalhes.rows[0].cells[1].innerText = formatter.format(descontos.toFixed(2));
    detalhes.rows[1].cells[1].innerText = formatter.format(faltas.toFixed(2));
    detalhes.rows[2].cells[1].innerText = formatter.format(liquidoPago.toFixed(2));
}

function edit(row){
    row = row.parentElement.parentElement;
    let editvalor = document.getElementById("valorEdit");
    let editEnviar = document.getElementById("edit-enviar");
    editEnviar.removeEventListener('onclick', function(){edit(self)})
    editvalor.removeEventListener('keyup',formatarNumero);
    editvalor.removeEventListener('keydown',checkNumero);
    let edittipo = document.getElementById("tipoEdit");
    edittipo.removeEventListener('keydown', valorValidate)
    tipo = row.cells[0].getElementsByTagName('input')[0].value;
    valor = row.cells[1].getElementsByTagName('input')[0].value;
    row.innerHTML = '<td>'+tipo+'</td><td>'+valor+'</td><td><a onClick="onEdit(this)">Editar</a><a onClick="onRemove(this)">Remover</a></td>'
    atualizarResultado();
    editando = false;
    /*cell.innerHTML = "<td>"+cell.value+"</td>"*/
}
function onEdit(td){
    if(editando == false){
        selectedRow = td.parentElement.parentElement;
        selectedRow.innerHTML = '<td><input type="text" name="tipo" id="tipoEdit" value='+selectedRow.cells[0].innerText+'></input></td>'+
                                '<td><input type="text" name="valor" id="valorEdit" value='+selectedRow.cells[1].innerText+'></input></td>'+
                                '<td><button class="btn"id="edit-enviar">Pronto</button></td>'
        let editvalor = document.getElementById("valorEdit");
        let editEnviar = document.getElementById("edit-enviar");
        let edittipo = document.getElementById("tipoEdit");
        edittipo.addEventListener('keydown', valorValidate);
        editvalor.addEventListener('keydown', checkNumero);
        editvalor.addEventListener('keyup', formatarNumero);
        editEnviar.addEventListener('click', function(){edit(editEnviar);});
        editando = true;
    }else{
        alert("Você já está editando outro valor!")
    }
}
function onRemove(row){
    row = row.parentElement.parentElement;
    row.parentElement.removeChild(row)
    atualizarResultado();
}
