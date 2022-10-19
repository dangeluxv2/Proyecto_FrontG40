// GET, POST, PUT Y DELETE

function getCategoria(){
    $.ajax({
        url:"http://192.18.155.115:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        }
    });
}

function postCategoria(){
    if ($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        
        $.ajax({
            url:"http://192.18.155.115:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
    
        });
    

    } 
    
    
}

function putCategoria(idBotonActualizar){
    if ($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };
    
    $.ajax({
        url:"http://192.18.155.115:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la categoria");
            window.location.reload();
        }

    });
    }
}

function deleteCategoria(idBotonBorrar){
    Swal.fire({
        title: ' ¿Está seguro de borrar la categoría? ',
        text: " Esta acción no es reversible ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: ' Eliminar '
      }).then((result) => {
        if (result.isConfirmed) {
            console.log(idBotonBorrar+"hola mundo");
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://192.18.155.115:8080/api/Category/"+ idBotonBorrar,
                type:"DELETE",
                datatype:"JSON",
                data: JSON.stringify(myData),
                contentType:"application/json",
                success:function(respuesta){
                   // alert("se borro correctamente la categoria");
                    window.location.reload();
                }
            });
          
          
            Swal.fire(
            
            
            
            ' Eliminado ',
            ' El registro ha sido eliminado con éxito ',
            'success'
          )
        }
      })

}

/////////////////////////////////////////////////////
function pintarCategoria(respuesta){
    let myTable="<table  class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='putCategoria("+respuesta[i].id+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteCategoria("+respuesta[i].id+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}
