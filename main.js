(function () {
    console.log('It works! autoinvocate function...');
});

console.log('WTF');

paymentWeeklyOpts = [3, 6, 8, 12, 15, 18, 24];
paymentBiweeklyOpts = [2, 4, 6, 24, 36];
paymentMonthlyOpts = [2, 4, 6, 12, 24, 36];

/*

Carrie Bradshaw
Smart TV Samsung 60
Prov: 13500
Lista: prov + 15% = 15525
credito: lista + 16% = 18009
periodo: quincenal
*/

allPaymentsList = [
    {
        "Cliente": "Carrie Bradshaw",
        "Articulo": "Smart TV Samsung 60",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "quincenal"
    },
    {
        "Cliente": "Carrie Bradshaw",
        "Articulo": "Smart TV Samsung 60",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "quincenal"
    },
    {
        "Cliente": "Carrie Bradshaw",
        "Articulo": "Smart TV Samsung 60",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "quincenal"
    },
    {
        "Cliente": "Charlotte York",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "semanal"
    },
    {
        "Cliente": "Charlotte York",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "semanal"
    },
    {
        "Cliente": "Miranda Hobbes",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "mensual"
    },
    {
        "Cliente": "Miranda Hobbes",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "mensual"
    },
    {
        "Cliente": "Miranda Hobbes",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "mensual"
    },
    {
        "Cliente": "Miranda Hobbes",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "mensual"
    },
    {
        "Cliente": "Jack Berger",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "semanal"
    },
    {
        "Cliente": "Kurt Harrington",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "quincenal"
    },
    {
        "Cliente": "Kurt Harrington",
        "Articulo": "",
        "Abono": "00.00",
        "Fecha": "12/07/2022",
        "Adeudo": "00.00",
        "Periodo": "quincenal"
    },
];

localStorage.setItem("paymentWeeklyOpts", JSON.stringify(paymentWeeklyOpts));
localStorage.setItem("paymentBiweeklyOpts", JSON.stringify(paymentBiweeklyOpts));
localStorage.setItem("paymentMonthlyOpts", JSON.stringify(paymentMonthlyOpts));
localStorage.setItem("allPaymentList", JSON.stringify(allPaymentsList));

paymentsArray = [];

$(document).ready(function () {

    console.log('It works!');

    //loadCustomers();
    //loadAutocompleteCustomers();

    let dataTablePayments = $('#tabPayments').DataTable({
        data: [/*{
            "Cliente": "Cliente Fijo Test",
            "Articulo": "Artículo Test",
            "Abono": "200.00",
            "Fecha": "12/07/2022",
            "Adeudo": "800.00",
            "Periodo": "semanal"
        }*/],
        columns: [
            { data: "Cliente" },
            { data: "Articulo" },
            { data: "Abono" },
            { data: "Fecha" },
            { data: "Adeudo" },
            { data: "Periodo" }],
        scrollX: true
    });

    $('.payment-section').hide();
    $('.section-payments-list').hide();


    // load customer data for new payments

    const list = JSON.parse(loadCustomers());

    $("#txtCustomer").autocomplete({
        // This shows the min length of charcters that must be typed before the autocomplete looks for a match.
        minLength: 2,
        source: function (request, response) {
            const findTxt = request.term;
            console.log(list);
            const res = list.filter(function (i){
                return i.customer.toLowerCase().indexOf(findTxt.toLowerCase()) >= 0;
            });
            //x.customer.includes(request.term)

            const resMap = res.map(function(i){
                return {
                    label: i.customer,
                    value: i.customer
                }
            });
            response(resMap);
            /*
            response($.map(list, function (value, key) {
                return {
                    label: value.customer,
                    value: value.customer
                }
            }));*/

        },
        focus: function (event, ui) {
            $('#txtCustomer').val(ui.item.customer);
            return false;
        },
        // Once a value in the drop down list is selected, do the following:
        select: function (event, ui) {

            dataTablePayments.clear().draw();

            // place the person.given_name value into the textfield called 'select_origin'...
            $('#txtCustomer').val(ui.item.value);
            // and place the person.id into the hidden textfield called 'link_origin_id'. 
            //$('#link_origin_id').val(ui.item.id);

            // cargar los datos del cliente seleccionado

            const allPaymentsStorage = JSON.parse(localStorage.getItem("allPaymentList"));

            const filterSelectedUser = allPaymentsStorage.filter(d => {
                return d.Cliente.toLowerCase().includes(ui.item.value.toLowerCase());
            });

            console.log('Filter selected user: ', filterSelectedUser);

            dataTablePayments.rows.add(filterSelectedUser).draw();

            loadCustomerData(filterSelectedUser[0]);

            return false;
        }
    });




    $('#btnAddPayment').on('click', () => {
        console.log('mostrar formulario de registro');
        $('.main-btns').hide(500);
        $('.payment-section').show(1000);
        $('.section-payments-list').show(700);
    });

    $('#btnListPayments').on('click', () => {
        alert('mostrar listado de registros de abono');
    });

    $('#btnReport').on('click', () => {
        alert('mostrar reportes');
    });

    $('#backToMain').on('click', () => {
        dataTablePayments.clear().draw();
        $('.main-btns').show(500);
        $('.payment-section').hide(1000);
        $('.section-payments-list').hide(1000);
    });

    $('#savePayment').on('click', () => {
        const dataPayment = $('#formAddPayment :input');

        let dataSerialized = dataPayment.serialize();

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        let values = {};
        dataPayment.each(function () {
            values[this.name] = $(this).val();
        });
        console.log('values', values);

        let paymentDate = new Date();
        const dd = String(paymentDate.getDate()).padStart(2, '0');
        const mm = String(paymentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = paymentDate.getFullYear();
        paymentDate = mm + '/' + dd + '/' + yyyy;

        const txtProductCost = values.txtProductCost;
        const txtPayment = values.txtPayment;
        const debtAccount = txtProductCost - txtPayment;

        paymentObjt = [values.txtCustomer, values.txtProduct, txtProductCost, paymentDate, debtAccount, values.selectedPeriod];

        console.log('paymentObjt to table: ', paymentObjt);
        paymentsArray.push(paymentObjt);
        console.log('paymentsArray to table: ', paymentsArray);

        //dataTablePayments.dataTable();

        /*
        $('#tabPayments').DataTable({
            data: paymentsArray,
            columns: [
                { title: 'Cliente' },
                { title: 'Artículo' },
                { title: 'Abono' },
                { title: 'Fecha de Cobro' },
                { title: 'Deuda actual' }
            ],
        });
        */

        /*
        dataTablePayments.rows.add( [ {
                "txtCustomer":       values.txtCustomer,
                "txtProduct":   values.txtProduct,
                "txtProductCost":     values.txtProductCost,
                "paymentDate": paymentDate,
                "debtAccount":     debtAccount
            }, {
                "txtCustomer":       "Tiger Nixon",
                "txtProduct":   "System Architect",
                "txtProductCost":     "$3,120",
                "paymentDate": "2011/04/25",
                "debtAccount":     "Edinburgh"
            } ] )
            .draw();

            */

        /*
    dataTablePayments.rows.add([
        values.txtCustomer,
        values.txtProduct,
        values.txtProductCost,
        paymentDate,
        debtAccount
    ], [
        values.txtCustomer,
        values.txtProduct,
        values.txtProductCost,
        paymentDate,
        debtAccount
    ])
        .draw();
        */

        //dataTablePayments.row.add(paymentObjt).draw();
        $('#formAddPayment').trigger("reset");


        //        console.log('JSON Parse: ', JSON.parse(values));

        //      console.log('JSON Parse serialize: ', JSON.parse(dataSerialized));

        //console.table(dataSerialized);
    });

    $('#selectPeriodType').on('change', function () {
        const selectedPeriod = $('#selectPeriodType').val();
        if (selectedPeriod === 'semanal')
            loadBiweeklyOpts(JSON.parse(localStorage.getItem("paymentWeeklyOpts")), ' semanas');
        else if (selectedPeriod === 'quincenal')
            loadBiweeklyOpts(JSON.parse(localStorage.getItem("paymentBiweeklyOpts")), ' quincenas');
        else
            loadBiweeklyOpts(JSON.parse(localStorage.getItem("paymentMonthlyOpts")), ' meses');
    });



});

loadBiweeklyOpts = (list, period) => {
    $('#selectNumPayments').empty();
    $.each(list, function () {
        $('#selectNumPayments')
            .append($("<option />")
                .val(this)
                .text(this + period));
    });
};

loadCustomers = () => {
    let paymentsFullList = JSON.parse(localStorage.getItem("allPaymentList"));
    const filterCustomersFromPayments = () => {
        return paymentsFullList.filter((el) =>
            el.toLowerCase().Periodo === 'semanal'
        );
    };

    const uniqueIds = [];

    let counterCustomer = 0;
    const names = paymentsFullList.map(function (item) {
        //return item['Cliente'];
        return { "customer": item['Cliente'], "id": ++counterCustomer }
    }).filter(element => {
        const isDuplicate = uniqueIds.includes(element.customer);

        if (!isDuplicate) {
            uniqueIds.push(element.customer);

            return true;
        }

        return false;
    });

    console.log(paymentsFullList);
    console.log('names', names);
    return JSON.stringify(names);
};

loadAutocompleteCustomers = () => {

    /*
    $( "#txtCustomer" ).autocomplete({
        minLength: 0,
        source: loadCustomers(),
        focus: function( event, ui ) {
          $( "#txtCustomer" ).val( ui.item.label );
          return false;
        },
        select: function( event, ui ) {
          $( "#txtCustomer" ).val( ui.item.label );
          return false;
        }
      })
      .autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<div>" + item.customer + "</div>" )
          .appendTo( ul );
      };
      */


    /*
    $("#txtCustomer").autocomplete({
      //source have a url of a service
      source: list,
      minLength: 1//min = 2 characters
      });
      */


    /*
    $( "#txtCustomer" ).autocomplete({
        source: function( request, response ) {
          $.ajax( {
            url: "search.php",
            dataType: "jsonp",
            data: {
              term: request.term
            },
            success: function( data ) {
              response( data );
            }
          } );
        },
        minLength: 2,
        select: function( event, ui ) {
          log( "Selected: " + ui.item.value + " aka " + ui.item.id );
        }
      } );
      */

};


loadCustomerData = (customerData) => {
    if (customerData) {
        $('#txtProduct').val(customerData.Articulo);
        $('#txtAddress').val('Ortoclasa Inf Pedregoso');
        $('#txtProductCost').val('00.00');
        $('#txtPoblation').val('SJR');
        $('#selectSaleType').val('plazos');
        $('#txtAgent').val('Vendedor uno');
        //$('#selectPeriodType').val('semanal');
        $('#selectPeriodType').val(customerData.Periodo).trigger('change');
        $('#selectNumPayments').val(6);
        $('#txtPayment').val(customerData.Abono);
        $('#txtComments').val('sin comentarios');
    }
};
