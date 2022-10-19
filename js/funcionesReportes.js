function getStatus(){
    $.ajax({
        url:"http://192.18.155.115:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
            console.log(respuesta);
        }
    });
}
function pintarStatus(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
        myTable+="<tr>";
        myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";   
 
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

function getFechas(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();
    
    $.ajax({
        url:"http://192.18.155.115:8080/api/Reservation/report-dates/"+dato1+"/"+dato2,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarFechas(respuesta);
            console.log(respuesta);
        }
    });

}

function pintarFechas(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado7").html(myTable);
}

function getClientes(){
    $.ajax({
        url:"http://192.18.155.115:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }
    });
}

function pintarCliente(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";

        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado8").html(myTable);
}