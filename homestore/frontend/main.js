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

paymentsArray = [];

$(document).ready(function () {

    console.log('It works!');

    let dataTablePayments = $('#tabPayments').DataTable({
        data: [{ 
            "Cliente": "Cliente uno", 
            "Articulo": "Cama", 
            "Abono": "200.00",
            "Fecha": "12/07/2022", 
            "Adeudo": "800.00", 
            "Periodo": "semanal" },
            { 
                "Cliente": "Cliente dos", 
                "Articulo": "Comedor", 
                "Abono": "200.00",
                "Fecha": "14/07/2022", 
                "Adeudo": "600.00", 
                "Periodo": "semanal" }
            ],
        columns: [
            { data: "Cliente" },
            { data: "Articulo" },
            { data: "Abono" },
            { data: "Fecha" },
            { data: "Adeudo" },
            { data: "Periodo" }]
    });

    $('.payment-section').hide();
    $('.section-payments-list').hide();


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


            dataTablePayments.rows.add( [ {
                "Cliente":       values.txtCustomer,
                "Articulo":   values.txtProduct,
                "Abono":     values.txtProductCost,
                "Fecha": paymentDate,
                "Adeudo":     debtAccount,
                "Periodo": values.selectPeriodType
            }, {
                "Cliente":       values.txtCustomer,
                "Articulo":   values.txtProduct,
                "Abono":     values.txtProductCost,
                "Fecha": paymentDate,
                "Adeudo":     debtAccount,
                "Periodo": values.selectPeriodType
            } ] )
            .draw();


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

