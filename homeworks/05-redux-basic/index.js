"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var reducer = function (state, action) {
    if (state === void 0) { state = { balance: 0 }; }
    var currentBalance = state.balance;
    switch (action.type) {
        case "CREDIT" /* CREDIT */:
            currentBalance -= action.payload;
            break;
        case "DEBIT" /* DEBIT */:
            currentBalance += action.payload;
            break;
        case "UPDATE_BALANCE" /* UPDATE_BALANCE */:
            currentBalance = action.payload;
            break;
        case "SUBTRACT_PERCENTAGE" /* SUBTRACT_PERCENTAGE */:
            currentBalance -= currentBalance * (action.payload / 100);
            break;
        case "SET_BALANCE_WITH_TAX" /* SET_BALANCE_WITH_TAX */:
            currentBalance *= (1 - action.payload);
            break;
    }
    return {
        balance: currentBalance
    };
};
var testStartState = {
    balance: 1200
};
var app = redux_1.createStore(reducer, testStartState);
var actions = [
    { type: 'UPDATE_BALANCE', payload: 1000.0 },
    { type: 'CREDIT', payload: 200.0 },
    { type: 'CREDIT', payload: 100.0 },
    { type: 'SET_BALANCE_WITH_TAX', payload: 14.0 },
    { type: 'DEBIT', payload: 250.0 },
    { type: 'UPDATE_BALANCE', payload: 1000.0 },
];
actions.forEach(function (action) {
    app.dispatch(action);
    console.log("ActionType: " + action.type + ", \n                 sum: " + action.payload + ", \n                 currentBalance: " + app.getState());
});
