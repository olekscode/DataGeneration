var ctx_left = document.getElementById('leftChart');
var ctx_right = document.getElementById('rightChart');

function data_gen(n, func, a=0, b=1) {
  var data = [];
  var x, y, offset;

  for (var i = 0; i < n; ++i) {
    x = Math.random() * b + a;
    y = func(x);
    offset = Math.random();

    for (var j = 0; j < 100; ++j) {
      if (Math.random() > 0.5) {
        offset += 1;
      }
      else {
        break;
      }
    }

    offset *= 10;

    if (Math.random() > 0.5) {
      y += offset;
    }
    else {
      y -= offset;
    }

    data.push({x: x, y: y, r: 3});
  }
  return data;
}

function line_data(weights, a, b) {
  var n = 1000;
  var step = (b - a) / n;
  var data = [];
  var x;

  for (var i = 0; i < n; ++i) {
    x = a + i * step;

    data.push({
      x: x,
      y: weights[0] + weights[1] * x,
      r: 1
    });
  }
  return data;
}

function cost(weights, data) {
  var cost = 0;
  var delta;

  data.forEach(function(entry) {
    delta = entry.y - (weights[0] + weights[1] * entry.x);
    cost += delta * delta;
  });

  return cost / (2 * data.length);
}

function cost_derivatives(weights, data) {
  var derivatives = [0, 0];
  var delta;

  data.forEach(function(entry){
    delta = entry.y - (weights[0] + weights[1] * entry.x);
    derivatives[0] += delta;
    derivatives[1] += delta * entry.x;
  });

  derivatives[0] /= data.length;
  derivatives[1] /= data.length;

  return derivatives;
}

function fit(data) {
  var precision = 0.01;
  var learning_rate = 0.01;

  var weights = [Math.random(), Math.random()];
  var cost_curr = cost(weights, data);
  var cost_prev = cost_curr + 1;
  var derivatives;

  while (cost_prev - cost_curr > precision) {
    derivatives = cost_derivatives(weights, data);
    weights[0] += learning_rate * derivatives[0];
    weights[1] += learning_rate * derivatives[1];

    cost_prev = cost_curr;
    cost_curr = cost(weights, data);
  }
  console.log("Cost: " + cost_curr);

  return weights;
}

var d_blue_data = data_gen(100, function(x){return (10-x) * (10-x)}, 0, 10);
var l_blue_data = data_gen(100, function(x){return 100 - (10-x) * (10-x)}, 0, 10);

var d_red_data = data_gen(100, function(x){return x * x}, 0, 10);
var l_red_data = data_gen(100, function(x){return 100 - x * x}, 0, 10);

var d_blue_line = line_data(fit(d_blue_data), 0, 10);
var l_blue_line = line_data(fit(l_blue_data), 0, 10);

var d_red_line = line_data(fit(d_red_data), 0, 10);
var l_red_line = line_data(fit(l_red_data), 0, 10);

var data_left = {
  datasets: [
    {
      label: 'Dark Data',
      data: d_blue_data,
      backgroundColor:"#8caacd",
      hoverBackgroundColor: "#8caacd",
    },
    {
      label: 'Light Data',
      data: l_blue_data,
      backgroundColor:"#b9ccd1",
      hoverBackgroundColor: "#b9ccd1",
    },
    {
      label: 'Dark Line',
      data: d_blue_line,
      backgroundColor:"#8caacd",
      hoverBackgroundColor: "#8caacd",
    },
    {
      label: 'Light Line',
      data: l_blue_line,
      backgroundColor:"#b9ccd1",
      hoverBackgroundColor: "#b9ccd1",
    }]
};

var data_right = {
  datasets: [
    {
      label: 'Dark Data',
      data: d_red_data,
      backgroundColor:"#f25750",
      hoverBackgroundColor: "#f25750",
    },
    {
      label: 'Light Data',
      data: l_red_data,
      backgroundColor:"#feaa97",
      hoverBackgroundColor: "#feaa97",
    },
    {
      label: 'Dark Line',
      data: d_red_line,
      backgroundColor:"#f25750",
      hoverBackgroundColor: "#f25750",
    },
    {
      label: 'Light Line',
      data: l_red_line,
      backgroundColor:"#feaa97",
      hoverBackgroundColor: "#feaa97",
    }]
};

var leftChart = new Chart(ctx_left, {
    type: 'bubble',
    data: data_left,
    options: {
        elements: {
            points: {
                borderWidth: 1,
                borderColor: 'rgb(0, 0, 0)'
            }
        }
    }
});

var rightChart = new Chart(ctx_right, {
    type: 'bubble',
    data: data_right,
    options: {
        elements: {
            points: {
                borderWidth: 1,
                borderColor: 'rgb(0, 0, 0)'
            }
        }
    }
});
