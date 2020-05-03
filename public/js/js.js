/*
 *
 * Lawhty - Responsive store dashboard
 * first edition
 * abdalsalaam.xyz
 * facebook.com/Abdalsalaam.94
 *
 */

$(document).ready(function() {

    var chart1 = $("#visitorsVsSales");
    var visitorsVsSales = new Chart(chart1, {
        type: 'line',
        data: {
            labels: ["01/01/2017", "02/01/2017", "03/01/2017", "04/01/2017", "05/01/2017", "06/01/2017", "07/01/2017"],
            datasets: [{
                label: "الطلبات",
                data: [20, 30, 80, 20, 40, 10, 60],
                fill: false,
                borderWidth:2,
                borderColor: "rgb(100,100,100)",
                backgroundColor:"rgb(100,100,100)",
                lineTension: 0, /*انحناء*/
                pointBorderWidth: 4
            }, {
                label: "الزوار",
                data: [1946, 1900, 1470, 2230, 2500, 2210, 1850],
                fill: false,
                borderWidth:2,
                borderColor: "rgb(241,92,97)",
                backgroundColor:"rgb(241,92,97)",
                lineTension: 0, /*انحناء*/
                pointBorderWidth: 4
            }]
        },
        options:{
            legend: {
                position:'bottom',
                labels:{
                    fontFamily:"'JF Flat Regular'"
                }
            }
        }
    });

    var chart2 = $("#dailySalesChart");
    var dailySalesChart = new Chart(chart2, {
        type: 'doughnut',
        data: {
            labels: ["أطفال", "رجالي", "نسائي"],
            datasets: [{
                data: [12, 19, 3],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)'
                ]
            }]
        },
        options:{
            legend: {
                position:'bottom',
                labels:{
                    fontFamily:"'JF Flat Regular'"
                }
            }
        }
    });


    $('#last-orders').slimScroll({
        position: 'left',
        height: '415px'
    });


    $('#tasks-list').slimScroll({
        position: 'left',
        height: '120px'
    });




    var body = document.body,
        openBtn = $( '#open-button' ),
        content = $("#siteContent"),
        isOpen = false;

    function toggleMenu() {
        if( isOpen ) {
            classie.remove( body, 'slideMenu-display' );
        }
        else {
            classie.add( body, 'slideMenu-display' );
        }
        isOpen = !isOpen;
    }

/* openBtn.on( 'click', toggleMenu );
    content.on( 'click', function() {
        if( isOpen ) {
            toggleMenu();
        }
    } );*/

    $('#editor').trumbowyg({
        lang: 'ar'
    });

  

});

