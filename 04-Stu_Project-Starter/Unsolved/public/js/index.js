// Get references to page elements
var $stockText = $("#stock-text");
var $company = $("#company-name");
var $submitBtn = $("#submit");
var $stockList = $("#stock-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveStock: function(stock) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/stocks",
      data: JSON.stringify(stock)
    });
  },
  getStocks: function() {
    return $.ajax({
      url: "api/stocks",
      type: "GET"
    });
  },
  deleteStock: function(id) {
    return $.ajax({
      url: "api/stocks/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshStocks = function() {
  API.getStocks().then(function(data) {
    var $stocks = data.map(function(stock) {
      var $a = $("<a>")
        .text(stock.symbol)
        .attr("href", "/stock/" + stock.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": stock.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $stockList.empty();
    $stockList.append($stocks);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var stock = {
    symbol: $stockText.val().trim(),
    companyName: $company.val().trim()
  };

  if (!(stock.symbol && stock.companyName)) {
    alert("You must enter a stock symbol and company name!");
    return;
  }

  

  API.saveStock(stock).then(function() {
    refreshStocks();
  });

  $stockText.val("");
  $company.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteStock(idToDelete).then(function() {
    refreshStocks();
  });
};

// $(document).on('click', '.list-group-item', function() {
//   //select an enemy to fight
//   names = ($(this).data('id'));
// }

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$stockList.on("click", ".delete", handleDeleteBtnClick);

// updateStock();

// function updateStock() {
//   $.getJSON(
//     "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=78QJO9OVU07HPZGH",
//     function(json) {
//       var times = json["Time Series (1min)"];
//         console.log(times);
//     }
//   );
// };

var seriesOptions = [],
  seriesCounter = 0,
  names = ['goog'];

function createChart() {

  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 4
    },
    yAxis: {
      labels: {
        formatter: function() {
          return (this.value > 0 ? ' + ' : '') + this.value + '%';
        }
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
      }]
    },
    plotOptions: {
      series: {
        compare: 'percent',
        showInNavigator: true,
        // turboThreshold: 0
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
      valueDecimals: 2,
      split: true
    },
    series: seriesOptions
  });
}

$.each(names, function(i, name) {

  $.getJSON('https://www.quandl.com/api/v1/datasets/WIKI/' + name.toLowerCase() + '.json?auth_token=LnZgCF8fyVmHREMm9p3a', function(data) {
    var newData = [];

    data.data.forEach(function(point) {
      newData.push([new Date(point[0]).getTime(), point[1]]);
    });

    newData.reverse();

    seriesOptions[i] = {
      name: data.code,
      data: newData
    };

    // As we're loading the data asynchronously, we don't know what order it will arrive. So
    // we keep a counter and create the chart when all the data is loaded.
    seriesCounter += 1;

    if (seriesCounter === names.length) {
      createChart();
    }
  });
});