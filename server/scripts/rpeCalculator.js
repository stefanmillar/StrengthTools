'use strict';

// This is a json representation of Mike Tuchscherers RPE table found on https://articles.reactivetrainingsystems.com/2015/11/29/beginning-rts/
const rpeTable = {
    '10': [1, 0.955, 0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680],
    '9.5': [0.978, 0.939, 0.907, 0.878, 0.850, 0.824, 0.799, 0.774, 0.751, 0.723, 0.694, 0.667],
    '9': [0.955, 0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653],
    '8.5': [0.939, 0.907, 0.878, 0.850, 0.824, 0.799, 0.774, 0.751, 0.723, 0.694, 0.667, 0.640],
    '8': [0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.690, 0.653, 0.626],
    '7.5': [0.907, 0.878, 0.850, 0.824, 0.799, 0.774, 0.751, 0.723, 0.694, 0.667, 0.640, 0.613],
    '7': [0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.626, 0.599],
    '6.5': [0.878, 0.850, 0.824, 0.799, 0.774, 0.751, 0.723, 0.694, 0.667, 0.640, 0.613, 0.586]
}

const MAX_REPS = 12;

function calculateWeights(weight, reps, rpe) {
    let repsParsed = parseInt(reps);
    let oneRepMax = weight / rpeTable[rpe][repsParsed];

    let weightTable = {
        '10': [],
        '9.5': [],
        '9': [],
        '8.5': [],
        '8': [],
        '7.5': [],
        '7': [],
        '6.5': []
    }

    for(let key in rpeTable) {
        for(let i = 0; i < MAX_REPS; i++) {
            let calculatedWeight = oneRepMax * rpeTable[key][i];
            calculatedWeight = Math.round(calculatedWeight / 2.5) * 2.5;
            weightTable[key].push(calculatedWeight);
        }
    }

    return weightTable;
}

module.exports = {
    calculateWeights: calculateWeights
}