function convertDataTable() {
      $('#table-to-paging').DataTable({
        responsive: true,
        lengthMenu: [
          [5, 10, 25, 50, 100, -1],
          [5, 10, 25, 50, 100, 'Todos']
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(Filtrados de _MAX_ registros totales)",
            "paginate": {
              "previous": "Anterior",
              "next": "Siguiente"
            },
            "search": "Búsqueda:"
          },
          "initComplete": function () {
            console.log('@@@ init complete @@@');
            document.getElementById("containerSpinner").style.display = "none";
            document.getElementById("loading").style.display = "none";
          },
      });
  }

  function reloadData() {

  }