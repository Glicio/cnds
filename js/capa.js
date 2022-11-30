const empenhostable = document.getElementById("empenhos-list")
const folhaData = JSON.parse(localStorage.getItem("folhaData"))
console.log(folhaData)

const setItem = (id,valor) =>{
    item = document.getElementById(id)
    item.innerHTML = valor;
}


const getFuncionalProgramatica = (sec) => {
  switch (sec){
     case "adm":
      return "03.30.04.122.0010.2003"
    case "fin":
      return "04.40.04.122.0001.2005"
    case "gab":
      return "02.20.04.122.0001.2002"
    case "agr":
      return "10.10.20.122.0001.2017"
    case "obr":
      return "03.30.04.122.0010.2003"
    default: 
      return "__.__.__.___.____.____"
  }
}

const getNaturezaDespesa = (tipo) => {
  switch(tipo){
      case "com":
          return "3.1.90.11";
      case "contr":
          return "3.1.90.04";
      case "ef":
          return "3.1.90.11";
      default:
        return "_._.__.__"
  }
}

const getOrgao = (sec) => {
  switch(sec){
      case "adm":
          return "ADMINISTRAÇÃO"
      case "fin":
          return "FINANÇAS"
      case "gab":
          return "GABINETE"
      case "ass":
          return "ASSISTENCIA SOCIAL"
      case "agr":
          return "AGRICULTURA"
      case "edu":
          return "EDUCAÇÃO"
      case "sau":
          return "SAÚDE"
      case "iaprem": 
          return "IAPREM"
      case "obr":
          return "OBRAS"
  }
}
const sortTable = (tableid) => {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(tableid);
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
window.onload = () =>{
    
    setItem('historico',folhaData.historico)
    let {valores} = folhaData
    for(let i in valores){
      //Aparentemente o carácter que o formatter usa não é um espaço?????
      if(valores[i].slice(3,valores[i].length) === "0,00" || i == "historico") continue
      
      row = empenhostable.insertRow()
      if(i === "f") row.setAttribute("style", "font-weight: bold;")
      desd = row.insertCell()
      n_emp = row.insertCell()
      v_emp = row.insertCell()
      desd.innerHTML = i === "f" ? "NAE - Faltas" : i
      v_emp.innerHTML = valores[i]
    }

    const dataProtocolo = new Date(folhaData.dataProtocolo.replace(/-/g, '\/'))

    const funcProg = document.getElementById("funcProg")
    const naturezaDespesa = document.getElementById("naturezaDespesa")
    const orgao = document.getElementById("orgao")
    document.getElementById("anoProtocolo").innerHTML = `${dataProtocolo.getFullYear()}`
    document.getElementById("anoExercicio").innerHTML = `${dataProtocolo.getFullYear()}`
    document.getElementById("dataProtocolo").innerHTML = `EM: ${dataProtocolo.toLocaleDateString()}`
    funcProg.innerHTML = getFuncionalProgramatica(folhaData.sec)
    naturezaDespesa.innerHTML = getNaturezaDespesa(folhaData.tipoFunc)
    orgao.innerHTML = getOrgao(folhaData.sec);
    
    sortTable("empenhos-list")
    print()
}
