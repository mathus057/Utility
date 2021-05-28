var GridTable = [];
var _controller = "CustomerService/EdocImportExcel";
var EdocImportExcelScript = function () {
    var onloadEvent = function () {
        let g_data;
        let _columns = [
            {
                "title": "App No.",
                "data": "AppNo"
            },
            {
                "title": "Contract No.",
                "data": "ContractNo"
            },
            {
                "title": "Contract Date",
                "data": "ContractDate"
            },
            {
                "title": "Send Datasafe Date",
                "data": "SendDatasafeDate"
            },
            {
                "title": "Datasafe Receive Date",
                "data": "DatasafeReceiveDate"
            },
            {
                "title": "Cleansing Date",
                "data": "CleansingDate"
            },
            {
                "title": "Scan PDF Date",
                "data": "ScanPDFDate"
            },
        ];


        //****************************************
        $('#inputImport').change(function (evt) {

            LoadingTools.blockUI();

            let files = evt.target.files; // FileList object
            let xl2json = new ExcelToJSON();

            xl2json.parseExcel(
                files[0],
                function (data) {
                    //g_data.data = JSON.parse(data)
                    g_data = JSON.parse(data)

                    $('#tbl_ImportExcelFromDatasafe').DataTable({
                        "searching": false,
                        "paging": false,
                        "destroy": true,
                        "data": g_data,
                        "columns": _columns,
                        "initComplete": function (settings, json) {

                            $("#totalRecord").text(this.fnGetData().length);
                        }
                    });

                    LoadingTools.unblockUI();
                });
        });


        $("#btnSave").click(function (e) {
            $.confirm({
                title: '',
                content: '<div style="text-align:center;font-size:large;"><span class="">Do you want to upload data from Datasafe!</sapn><br/></div>',
                buttons: {
                    Confirm: {
                        btnClass: 'btn-blue',
                        action: function () {
                            UploadData(g_data);
                        },
                    },
                    Cancel: {
                        btnClass: '',
                        action: function () { },
                    },
                }
            });
        });


        $("#btnClear").click(function (e) {

            try {
                //$('#tbl_ImportExcelFromDatasafe').DataTable().clear().draw();
                $("#tbl_ImportExcelFromDatasafe tbody").empty();
                $("#totalRecord").text('0');
                $('#inputImport').val('');
            }
            catch (e) {
                debugger;
            }
        });
    }

    let ExcelToJSON = function (file) {
        this.parseExcel = function (file, callBack) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                workbook.SheetNames.forEach(function (sheetName) {
                    // Here is your object
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    var json_object = JSON.stringify(XL_row_object);
                    //console.log(json_object);
                    callBack(json_object);
                });
            };

            reader.onerror = function (ex) {
                console.log(ex);
            };

            reader.readAsBinaryString(file);
        };
    };

    let UploadData = (data) => {

        AjaxTools.Post(_weburl + _controller + "/UploadData",
            data,
            function (obj) {

                $('#tbl_ImportExcelFromDatasafe').DataTable().clear().draw();
                AlertTools.Success("บันทึกข้อมูลเรืยบร้อยแล้ว");
            },
            function (XMLHttpRequest, textStatus, errorThrown) {
                AlertTools.Error();
            }, true);
    }

    return {
        init: function () {
            onloadEvent();
        }
    }
}();