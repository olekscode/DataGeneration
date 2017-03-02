class LinearRegressionClassifier {
    constructor (input_size, learning_rate) {
        this.input_size = input_size;
        this.learning_rate = learning_rate;
        this.weights = [];

        for (let i = 0; i < input_size + 1; ++i) {
            this.weights.push(Math.random());
        }
    }

    /**
    *   Calculates the error of classifier on a given data
    */
    cost(data) {
        let cost = 0;
        let delta;

        // console.log(data[0].x, data[1].x, data[data.length - 1].x);

        for (let i = 0; i < data.length; ++i) {
            delta = this.weights[0];

            for (let j = 0; j < this.input_size; ++j) {
                // TODO: Make data.x an array data[i].x[j]
                delta += this.weights[j + 1] * data[i].x;
            }

            delta = data[i].y - delta;
            cost += delta * delta;
        }

        // data.forEach(function(entry) {
        //     delta = this.weights[0];
        //
        //     for (let i = 0; i < this.input_size; ++i) {
        //         delta += this.weights[i + 1] * entry.x[i];
        //     }
        //     delta = entry.y - delta;
        //     cost += delta * delta;
        // });

        return cost / (2 * data.length);
    }

    cost_derivatives(data) {
        let derivatives = new Array(this.input_size + 1).fill(0);
        let delta;

        for (let entry of data) {
            delta = entry.y - (this.weights[0] + this.weights[1] * entry.x);
            derivatives[0] += delta;
            console.log(derivatives[0]);

            for (let i = 0; i < this.input_size + 1; ++i) {
                // TODO: Make data.x an array data[i].x[j]
                derivatives[i + 1] += delta * entry.x;
            }
        }

        for (let der of derivatives) {
            der /= this.input_size;
        }

        return derivatives;
    }

    fit(data) {
        const precision = 0.001;

        let cost_curr = this.cost(data);
        let cost_prev = cost_curr + 1;
        let derivatives;

        while (cost_prev - cost_curr > precision) {
            derivatives = this.cost_derivatives(data);

            for (let i = 0; i < this.input_size + 1; ++i) {
                this.weights[i] += this.learning_rate * derivatives[i];
            }

            cost_prev = cost_curr;
            cost_curr = this.cost(data);
        }
        console.log("Cost: " + cost_curr);

        return this.weights;
    }
}

// function cost(weights, data) {
//     let cost = 0;
//     let delta;
//
//     data.forEach(function(entry) {
//         delta = entry.y - (weights[0] + weights[1] * entry.x);
//         cost += delta * delta;
//     });
//
//     return cost / (2 * data.length);
// }

// function cost_derivatives(weights, data) {
//     let derivatives = [0, 0];
//     let delta;
//
//     data.forEach(function(entry){
//         delta = entry.y - (weights[0] + weights[1] * entry.x);
//         derivatives[0] += delta;
//         derivatives[1] += delta * entry.x;
//     });
//
//     derivatives[0] /= data.length;
//     derivatives[1] /= data.length;
//
//     return derivatives;
// }

// function fit(data) {
//     let precision = 0.01;
//     let learning_rate = 0.01;
//
//     let weights = [Math.random(), Math.random()];
//     let cost_curr = cost(weights, data);
//     let cost_prev = cost_curr + 1;
//     let derivatives;
//
//     while (cost_prev - cost_curr > precision) {
//         derivatives = cost_derivatives(weights, data);
//         weights[0] += learning_rate * derivatives[0];
//         weights[1] += learning_rate * derivatives[1];
//
//         cost_prev = cost_curr;
//         cost_curr = cost(weights, data);
//     }
//     console.log("Cost: " + cost_curr);
//
//     return weights;
// }
