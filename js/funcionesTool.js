////////////////GET,POST,PUT Y DELETE

function getTool(){
    $.ajax({
        url:"http://192.18.155.115:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarTool(respuesta);
        }
    });

}

function postTool(){
    if ($("#brand").val().length==0 || 
    $("#year").val().length==0 || 
    $("#name").val().length==0 || 
    $("#description").val().length==0 ){
    alert("Todos los campos son obligatorios");
}else{
    
    let cajas = {
        brand:$("#brand").val(),
        year:$("#year").val(),
        name:$("#name").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()}
    };
    console.log(cajas);
    
    $.ajax({
        url:"http://192.18.155.115:8080/api/Tool/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el Tool");
            window.location.reload();
            }
        });
    }
}

function putTool(idBotonActualizar){
    if ($("#brand").val().length==0 || 
        $("#year").val().length==0 || 
        $("#name").val().length==0 || 
        $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idBotonActualizar,
        brand:$("#brand").val(),
        year:$("#year").val(),
        name:$("#name").val(),
        description:$("#description").val(),
        category:{id: +$("#select-category").val()}
    };
    
    $.ajax({
        url:"http://192.18.155.115:8080/api/Tool/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la herramineta");
            window.location.reload();
        }

    });
    }

}

function deleteTool( idBotonBorrar){
    Swal.fire({
        title: '¿Está seguro de borrar la herramienta?',
        text: "Esta acción no es reversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: ' Eliminar '
      }).then((result) => {
        if (result.isConfirmed) {
           
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://192.18.155.115:8080/api/Tool/"+ idBotonBorrar,
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
            
            
            
            'Eliminado',
            'El registro ha sido eliminado con éxito',
            'success'
          )
        }
      })
}


/////////////////
function getTool_Category(){
    //console.log("hola desde tool")
    $.ajax({
        url:"http://192.18.155.115:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });

}

/////////////////////////////////////////////////////
function pintarTool(respuesta){
    let myTable="<table  class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.description+"</td>";


        myTable+="<td> <button onclick='putTool("+respuesta[i].id+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteTool("+respuesta[i].id+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button> "
       
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}