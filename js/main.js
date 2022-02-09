let tipos = ["01","10","33","37","43","99","ex","f","d","42","44"]
let tipoInput = document.getElementById("tipo");
let valorInput = document.getElementById("valor");
let editando = false;

var data = []


const customAlert = (msg) => {
    let alert = document.getElementById("alert");
    let text = document.getElementById("alert-text");
    text.innerHTML = msg;
    alert.style.display = "flex";
    setTimeout(() => {
        alert.style.display = "none";
    },2000)
    return "Legal";
}

const copyToClipboard = () => {
    let txt = document.getElementById("historico_folha");
    navigator.clipboard.writeText(txt.value);
    customAlert("Copiado para área de transferência!<br><br>Use CTRL+V para colar!");
    let n_f = document.getElementById("n_foha");
    n_f.focus();
    
}

//GERADOR DE HISTORICOS PARA FOLHAS (IMPLEMENTAR IAPREM DPS??)
document.querySelector('.form').addEventListener('input', (e) => {
    n_folha = document.getElementById("n_folha")
    q_func = document.getElementById("q_func")
    tipo_func = document.getElementById("tipo_func")
    sec = document.getElementById("sec")
    mes = document.getElementById("mes")
    desc = document.getElementById("desc")
    resultado = document.getElementById("historico_folha")
    tipo_doc = document.getElementById("tipo_doc")
    /*console.log("Quantidade de Funcionários: "+q_func.value+
    "\nTipo de Funcionários: "+tipo_func.value+
    "\nSecretaria: "+sec.value+
    "\nMês: "+mes.value+
    "\nDescrição: "+desc.value)*/
    const get_tipo_func = (tipo) => {
        switch(tipo){
            case "com":
                return "COMISSIONADO(S)";
            case "contr":
                return "CONTRATADO(S)";
            case "ef":
                return "EFETIVO(S)";
            case "outro":
                return "";

        }
    }

    const get_sec = (sec) => {
        switch(sec){
            case "adm":
                return "DA SEC. MUNICIPAL DE ADMINISTRAÇÃO"
            case "fin":
                return "DA SEC. MUNICIPAL DE FINANÇAS"
            case "gab":
                return "DO GABINETE DO PREFEITO"
            case "ass":
                return "DA SECRETARIA MUNICIPAL DE ASSISTENCIA SOCIAL"
            case "agr":
                return "DA SECRETARIA MUNICIPAL DE AGRICULTURA"
            case "edu":
                return "DA SECRETARIA MUNICIPAL DE EDUCAÇÃO"
            case "sau":
                return "DA SECRETARIA MUNICIPAL DE SAÚDE"
            case "iaprem": 
                return "DO IAPREM"
            case "obr":
                return "DA SECRETARIA MUNICIPAL DE OBRAS"
        }
    }

    const get_mes = (mes) => {
        switch(mes){
            case "jan":
                return "JANEIRO";
            case "fev":
                return "FEVEREIRO";
            case "mar":
                return "MARÇO";
            case "abr":
                return "ABRIL";
            case "mai":
                return "MAIO";
            case "jun":
                return "JUNHO";
            case "jul":
                return "JULHO"
            case "ago":
                return "AGOSTO"
            case "set":
                return "SETEMBRO"
            case "out":
                return "OUUBRO"
            case "nov":
                return "NOVEMBRO"
            case "dez":
                return "DEZEMBRO"
        }
    }

    const get_desc = (desc) => {
        if (desc){
            return ` - ${desc.toUpperCase()}`
        }else{
            return ""
        }
        
    }
    let result = ""
    if(tipo_doc.value == "folha"){
        result = `FOLHA Nº ${n_folha.value}, REFERENTE A ${q_func.value} FUNCIONÁRIO(S) ${get_tipo_func(tipo_func.value)} ${get_sec(sec.value)}. FOLHA RELATIVA AO MÊS DE ${get_mes(mes.value)} DE 2022${get_desc(desc.value)}`;
    }else{
        result = `GUIA DE RECOLHIMENTO DO IAPREM Nº ${n_folha.value}, REFERENTE A ${q_func.value} FUNCIONÁRIO(S) ${get_tipo_func(tipo_func.value)} ${get_sec(sec.value)}. GUIA RELATIVA AO MÊS DE ${get_mes(mes.value)} DE 2022${get_desc(desc.value)}`;
    }
    

    resultado.value = result;


  });


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
    for(let i=0; i<valor.length; i++){

        if(valor.charAt(i) == "0" && valor.length > 4){
            valor = valor.substring(i+1,valor.length);
            break;
        }
        else{
            break;
        }
    }
    vl = valor.length
    if(vl < 4){
        valor = "0"+valor.substring(0, valor.length-2)+"."+valor.substring(valor.length-2,valor.length);
    }else{
        valor = valor.substring(0, valor.length-2)+"."+valor.substring(valor.length-2,valor.length);
    }
    el.target.value = valor;
}
function checkNumero(e){
    //console.log(e.key == "Backspace");
    if(!/^([0-9])$/.test(e.key) && e.key != "Backspace" && e.key !="Tab" && e.key !="Enter"){
        e.preventDefault();
        return false;
    }
}
function valorValidate(e){
    if(e.target.value.length > 1 && e.key != "Backspace" && e.key != "Tab"){
        e.preventDefault();
        return false;
    }
}
function nextInput(e){
    if(e.target.value.length == 2 || e.target.value.toLowerCase() == "f" || e.target.value.toLowerCase() == "d"){
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
        customAlert("Tipo inválido")
    }
    tipoInput.focus();
    tipoInput.value = "";
    valorInput.value = "";
}
function getFormData(){
    var formData = {};
    formData["tipo"] = document.getElementById("tipo").value.toLowerCase();
    formData["valor"] = document.getElementById("valor").value;
    return formData;
}
function insertData(data){
    table = document.getElementById("list").getElementsByTagName("tbody")[0];
        newrow = table.insertRow(table.length);
        switch(data.tipo){
            case "ex":
                newrow.setAttribute("style", "background-color: hsla(37, 78%, 33%, 0.36)");
                break;
            case "f":
                newrow.setAttribute("style", "background-color: hsla(360, 78%, 33%, 0.54)");
                break;
            case "d":
                newrow.setAttribute("style", "background-color:hsla(212, 15%, 33%, 0.54)");
                break;
        }
        
        cell1 = newrow.insertCell(0);
        cell1.innerHTML = data.tipo;
        cell2 = newrow.insertCell(1);
        cell2.innerHTML = data.valor;
        cell3 = newrow.insertCell(2);
        cell3.innerHTML = '<a onClick="onEdit(this)">Editar</a><a onClick="onRemove(this)">Remover</a>';
        atualizarResultado();
        sortTable();
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
	let ferias_indenizadas = 0;
	let ferias_abono_pecuniario = 0;
    let descontos = 0;
    for(let i = 0; i< table.rows.length; i++){
        switch(table.rows[i].cells[0].innerText.toLowerCase()){
            case '01':
                salarios += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case '10':
                insalubridade += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case '33':
                gratificacoes += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case '37':
                quinquenio += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case '43':
                decimo += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case '99':
                outros += parseFloat(table.rows[i].cells[1].innerText);
                break;
            case 'ex':
                extra += parseFloat(table.rows[i].cells[1].innerText);
                break;
			case '42':
				ferias_indenizadas += parseFloat(table.rows[i].cells[1].innerText);
				break;
			case '44':
				ferias_abono_pecuniario += parseFloat(table.rows[i].cells[1].innerText);
				break;
			case 'f':
				faltas += parseFloat(table.rows[i].cells[1].innerText)
				break;
            case 'd':
                descontos += parseFloat(table.rows[i].cells[1].innerText);
        }
    }
    let liquidoPago = salarios+insalubridade+extra+gratificacoes+quinquenio+decimo+ferias_abono_pecuniario+ferias_indenizadas+outros-descontos-faltas;
    resultado.rows[0].cells[1].innerText = formatter.format(salarios.toFixed(2));
    resultado.rows[1].cells[1].innerText = formatter.format(insalubridade.toFixed(2)); 
    resultado.rows[2].cells[1].innerText = formatter.format(gratificacoes.toFixed(2)); 
    resultado.rows[3].cells[1].innerText = formatter.format(quinquenio.toFixed(2)); 
    resultado.rows[4].cells[1].innerText = formatter.format(decimo.toFixed(2)); 
    resultado.rows[5].cells[1].innerText = formatter.format(ferias_indenizadas.toFixed(2)); 
    resultado.rows[6].cells[1].innerText = formatter.format(ferias_abono_pecuniario.toFixed(2));
	resultado.rows[7].cells[1].innerText = formatter.format(outros.toFixed(2));
	resultado.rows[8].cells[1].innerText = formatter.format(extra.toFixed(2));
    detalhes.rows[0].cells[1].innerText = formatter.format(descontos.toFixed(2));
    detalhes.rows[1].cells[1].innerText = formatter.format(faltas.toFixed(2));
    detalhes.rows[2].cells[1].innerText = formatter.format(liquidoPago.toFixed(2));
    data = {
        "01":formatter.format(salarios.toFixed(2)),
        "10":formatter.format(insalubridade.toFixed(2)),
        "33":formatter.format(gratificacoes.toFixed(2)),
        "37":formatter.format(quinquenio.toFixed(2)),
        "43":formatter.format(decimo.toFixed(2)),
        "42":formatter.format(ferias_indenizadas.toFixed(2)),
        "44":formatter.format(ferias_abono_pecuniario.toFixed(2)),
        "99":formatter.format(outros.toFixed(2)),
        "f":formatter.format(faltas.toFixed(2)),
    }
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
        customAlert("Você já está editando outro valor!")
    }
}
function onRemove(row){
    row = row.parentElement.parentElement;
    row.parentElement.removeChild(row)
    atualizarResultado();
}
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("list");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

const imprimirCapa = () =>{
    sessionStorage.clear()
    data["historico"] = String(document.getElementById("historico_folha").value);
    for(item in data){
        console.log(`[${item}:${data[item]}]`);
        sessionStorage.setItem(item,data[item])
    }
    //
    //window.location.href = "/capa.html";
    window.open("/capa.html", '_blank').focus();
    console.log("redirecionado...");
}
