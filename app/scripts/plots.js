let clf = new LinearRegressionClassifier(1, 0.001);

let ctx_left = document.getElementById('leftChart');
let ctx_right = document.getElementById('rightChart');

function data_gen(n, func, a=0, b=1) {
  let data = [];
  let x, y, offset;

  for (let i = 0; i < n; ++i) {
    x = Math.random() * b + a;
    y = func(x);
    offset = Math.random();

    for (let j = 0; j < 100; ++j) {
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
  let n = 1000;
  let step = (b - a) / n;
  let data = [];
  let x;

  for (let i = 0; i < n; ++i) {
    x = a + i * step;

    data.push({
      x: x,
      y: weights[0] + weights[1] * x,
      r: 1
    });
  }
  return data;
}

let d_blue_data = data_gen(100, x => (10-x) * (10-x), 0, 10);
let l_blue_data = data_gen(100, x => 100 - (10-x) * (10-x), 0, 10);

let d_red_data = data_gen(100, x => x * x, 0, 10);
let l_red_data = data_gen(100, x => 100 - x * x, 0, 10);

// console.log(clf.fit(d_blue_data));

// let d_blue_line = line_data(clf.fit(d_blue_data), 0, 10);
// let l_blue_line = line_data(clf.fit(l_blue_data), 0, 10);

let weights = clf.fit(d_red_data);

let d_red_line = line_data(weights, 0, 10);
let l_red_line = line_data(weights, 0, 10);

// let data_left = {
//   datasets: [
//     {
//       label: 'Dark Data',
//       data: d_blue_data,
//       backgroundColor:"#8caacd",
//       hoverBackgroundColor: "#8caacd",
//     },
//     {
//       label: 'Light Data',
//       data: l_blue_data,
//       backgroundColor:"#b9ccd1",
//       hoverBackgroundColor: "#b9ccd1",
//     },
//     {
//       label: 'Dark Line',
//       data: d_blue_line,
//       backgroundColor:"#8caacd",
//       hoverBackgroundColor: "#8caacd",
//     },
//     {
//       label: 'Light Line',
//       data: l_blue_line,
//       backgroundColor:"#b9ccd1",
//       hoverBackgroundColor: "#b9ccd1",
//     }]
// };

let data_right = {
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

// let leftChart = new Chart(ctx_left, {
//     type: 'bubble',
//     data: data_left,
//     options: {
//         elements: {
//             points: {
//                 borderWidth: 1,
//                 borderColor: 'rgb(0, 0, 0)'
//             }
//         }
//     }
// });

let rightChart = new Chart(ctx_right, {
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
