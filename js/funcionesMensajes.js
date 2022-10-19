// GET, POST, PUT Y DELETE

function getMensajes(){
    $.ajax({
        url:"http://192.18.155.115:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){
    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            messageText:$("#messageText").val()
        
        };
        console.log(cajas);
        
        $.ajax({
            url:"http://192.18.155.115:8080/api/Message/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente el Mensaje");
                window.location.reload();
            }
        });
    }
}

function putMensajes(idBotonActualizar){

    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            idMessage:idBotonActualizar,
            messageText:$("#messageText").val()
        }
        console.log(cajas);
    
        $.ajax({
            url:"http://192.18.155.115:8080/api/Message/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Mensaje actualizado correctamente");
                window.location.reload();
            }
        });
    }
}

function deleteMensajes(idBotonBorrar){
    Swal.fire({
        title: '¿Está seguro de borrar el mensaje?',
        text: "Esta acción no es reversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
        
    }).then((result) => {
        if (result.isConfirmed) {
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://192.18.155.115:8080/api/Message/"+ idBotonBorrar,
                type:"DELETE",
                datatype:"JSON",
                data: JSON.stringify(myData),
                contentType:"application/json",
                success:function(respuesta){
                   window.location.reload();
                }
            });
        Swal.fire(
            'Eliminado',
            'El mensaje ha sido eliminado con éxito',
            'success'
          )
        }
    })


}

/////////////////
function pintarMensajes(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick='putMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg''>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado9").html(myTable);
}