var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/books",
            "type": "Get",
            "dataType": "json"
        },
        "columns": [
            { "data": "name", "width": "30%" },
            { "data": "author", "width": "30%" },
            {
                "data": "id",
                "render": function (data) {
                    return ` <div class="text-center">
                    <a href="/BookPages/Edit?id=${data}">Edit</a>
                 
                    <a onclick=Delete('/api/books/?id='+${data}) class="btn btn-danger js-delete">Delete</a>

                    <a href="/BookPages/Details?id=${data}">Details</a>
</div>
`
                }
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    })
}

function Delete(url) {
    swal({
        title: "Are you sure ?",
        text: "Once Deleting you can't access it again",
        icon: "warning",
        dangerMode: true
    }).then((WillDelete) => {
        if (WillDelete) {
            $.ajax({
                url: url,
                type: "DELETE",
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    }); 
}
 