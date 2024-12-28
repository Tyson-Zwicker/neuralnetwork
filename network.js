const Neuron = function () {
    this.weights = [];
    this.bias = 0;
    this.output = 0;
    this.error = 0;
}
const Network = function (numInputs, numHidden, numOutputs) {
    let hiddenLayer = [];
    let outputLayer = [];
    //TODO: change numHidden to numHiddenLayers: an array defining multiple size of hidden layers

    //Assign random weights to the hidden layer
    for (let i = 0; i < numHidden; i++) {
        let weights = [];
        for (let j = 0; j < numInputs; j++) {
            weights.push(Math.random());
        }
        let n = new Neuron();
        n.weights = weights;
        n.bias == Math.random();
        hiddenLayer.push(n);
    }
    //Assign random weights to the output layer
    for (let i = 0; i < numOutputs; i++) {
        let weights = [];
        for (let j = 0; j < numHidden; j++) {
            weights.push(Math.random());
        }
        let n = new Neuron();
        n.weights = weights;
        n.bias = Math.random();
        outputLayer.push(n);
    }
    this.layers = [];
    //I put the layers into an array to make it easier to add multiple hidden
    //layers.
    this.layers.push(hiddenLayer);
    this.layers.push(outputLayer);
}
const activate = function (inputs, weights, bias) {
    let activation = bias;
    for (let i = 0; i < weights.length; i++) {
        activation += weights[i] * inputs[i];
    }
    return activation;
}
const sigmoid = function (activation) {
    return 1 / (1 + Math.pow(Math.E, -activation));
}
const sigmoidDerivative = function (input) {
    return input * (1 - input);
}
//"inputs" is the array of initial values to be examined by the network.
//returns the output layer outputs.
const forwardPropigate = function (network, inputs) {
    //process each layer, from first hidden layer to output layer
    for (let i = 0; i < network.layers.length; i++) {
        //Will store the inputs for the next layer to 
        //think about.
        let newInputs = [];

        let layer = network.layers[i];
        //process each neuron in that layer
        for (let j = 0; j < layer[j].length; j++) {
            let neuron = layer[j];
            //Determine its outputs by calling the "active" function..
            //Which adds up all inputs it recieves and multiplies them by the 
            //weight it gives to the source of that input (the initial input 
            //OR another neurons output) and returns a single number.
            let activation = activate(
                neuron.weights,
                neuron.bias,
                inputs
            );
            //Then call the signmoid function, which just takes the number
            //returend by "activate" and squashes down to a nice number
            // between somewhere between 0 and 1.
            neuron.output = sigmoid(activation);
            //And the list of inputs for next layer..
            newInputs.append(neuron.output);
        }
        //Set next layers inputs the ones we just calculated.
        inputs = newInputs;
    }//repeat...
    let outputLayer = network.layers[network.layers.length - 1];
    let outputs = [];
    for (let i = 0; i < outputLayer.length; i++) {
        outputs.push(i);
    }
    return outputs;
}
//expected is a list of numbers that the inputs should have produced.
const backwardPropigate = function (network, expected) {
    //Starting at the output layer and working backwards to the first
    // hidden layer..
    let isOutputLayer = true;
    for (let i = network.layers.length - 1; i >= 0; i--) {
        let layer = network.layers[i];
        //"errors" will hold the total amount of error attribate to each
        //neuron in this layer.
        let errors = [];
        if (isOutputLayer) {
            //process each neuron in output layer
            for (let j = 0; j < layer.length; j++) {
                let neuron = layer[j];
                //In the case of the output layer, the "next last" layer is the 
                //expected output, not another neuron.
                errors.push(neuron.output - expected[j]);
            }
        } else {
            //process each neuron in this hidden layer
            if (!layer) {
                throw new Error(`layer #${i} is ${layer} #layers ${network.layers.length}`);
            }
            for (let j = 0; j < layer.length; j++) {
                let neuron = layer[j];
                let error = 0;
                //In the case of a hidden layer, the last layer is a layer
                // of neurons
                let lastLayer = network.layers[i + 1];
                //add to "this" neurons error by:
                //looking at all the neurons in the next layer and summing up
                //the product of how wrong it made each of them and 
                //their weight associated with "this" neuron).
                for (let k = 0; k < lastLayer.length; k++) {
                    let lastNeuron = lastLayer[k];
                    error += lastNeuron.weights[j] * lastNeuron.error;
                }
                errors.push(error);
            }
        }
        //Last step is we assign that list of errors that was just generated
        //to each of this neurons "error"
        for (let j = 0; j < network.layers.length; j++) {
            let neuron = network.layers[j];
            neuron.error = errors[j] * sigmoidDerivative(neuron.output);
        }
        isOutputLayer = false;
    }
}
const updateWeights = function (network, datasetRow, learningRate) {
    for (let i = 0; i < network.layers.length; i++) {
        let layer = network.layers[i];
        let inputs = undefined;
        if (i === 0) {
            inputs = datasetRow; //start with the input data
        } else {
            inputs = []; //build inputs for next layer from  last layer..
            let lastLayer = network.layers[i - 1];
            for (let j = 0; j < lastLayer.length; j++) {
                let nextLayerNeuron = lastLayer[j];
                inputs.push(lastLayer[j].output);
            }
        }
        for (let j = 0; j < layer.length; j++) {
            let neuron = layer[j];
            for (let k = 0; k < inputs.length; k++) {
                neuron.weights[j] -= learningRate * neuron.error * inputs[k];
            }
            neuron.bias -= learningRate * neuron.error;
        }
    }
}
//The dataset is a list of arrays. Each array represents an input, each element
//of the input can be considered the 0 layer nuerons' outputs.
//Returns a list error rates (first epoch to last).  Hopefully this number goes
//down!
const trainNetwork = function (network, dataset, learningRate, numEpochs,
    expectedOutput) {
    let errorRates = [];
    
    for (let epoch = 0; epoch < numEpochs; epoch++) {
        let sumError = 0;
        let datasetRowNumber = 0;
        dataset.forEach(row => {            
            let outputs = forwardPropigate(network, row);            
            
            //TODO: on a net with more than one output node, this would need to go through all of 
            //them, so this "outputs[0] would need to become outputs[i] in a loop...

            sumError += Math.pow(expectedOutput[datasetRowNumber] - outputs[0], 2)
            datasetRowNumber++;
            backwardPropigate(network, expectedOutput);
            updateWeights(network, row, learningRate);
        });
        errorRates.push(sumError)
    }
    return errorRates;
}