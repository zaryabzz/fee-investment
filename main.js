var years = [];
for (var i = 0;i<31;i++){
  years[i] = i;
};
var dps = [];
dps[0] = document.getElementById('slideFund').value;
for (var i= 1;i<31;i++){

  dps[i] = dps[i-1]* (1 + (6 - document.getElementById('slideFee').value)/100);
};


let myChart = document.getElementById("myChart").getContext('2d');

myChart.canvas.parentNode.style.height = '300px';
//myChart.canvas.parentNode.style.width = '128px';
Chart.defaults.global.defaultFontSize = 15;

let investmentchart = new Chart(myChart,{
  type: 'line',
  data: {
    labels : years,
    datasets : [{
      label : 'Investment Data',
      data : dps,
      backgroundColor : ' #dca5af',
      borderWidth: 1,
      borderColor : '#b00e23',
    }],
  },
  options : {
    maintainAspectRatio : false,
    title : {
      display : true,
      text: 'Investment Growth over 30 years',
      fontSize : 25,
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
            display: true,
            labelString: 'Years',
            fontSize: 20,
          }
        }]
      },
    legend:{
      display: false,
    },
    tooltips : {

      enabled : true,
      bodyFontSize : 20,
    }
  },
});

function updateChart(){
  var dps = []
  dps[0] = document.getElementById('slideFund').value;
  var growth = 1 + (6 - document.getElementById('slideFee').value)/100;
  for (var i= 1;i<31;i++){

    dps[i] = dps[i-1]* growth;
  };


  investmentchart.data.datasets[0].data = dps;
  investmentchart.update()
}




var slider1 = document.getElementById('slideFund')
var output1 = document.getElementById('FundValue')

output1.innerHTML = slider1.value
slider1.oninput = function() {
output1.innerHTML = "£"+addCommas(this.value);
updateChart();
}

var slider2 = document.getElementById('slideFee')
var output2 = document.getElementById('FeePercent')

output2.innerHTML = slider2.value

slider2.oninput = function() {
  output2.innerHTML = this.value;
updateChart();
}

function getValue() {
  var fndValue = document.getElementById('slideFund').value;
  document.getElementById('setfundValue').innerHTML = "£" + addCommas(fndValue);
}
function getPercent() {
  var fndValue = document.getElementById('slideFee').value;
  document.getElementById('setfundPercentage').innerHTML = "%" + addCommas(fndValue);
}

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}