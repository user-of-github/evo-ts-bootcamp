import {createStore} from 'redux'

const enum ActionType {
    UPDATE_BALANCE = 'UPDATE_BALANCE',
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    SUBTRACT_PERCENTAGE = 'SUBTRACT_PERCENTAGE',
    SET_BALANCE_WITH_TAX = 'SET_BALANCE_WITH_TAX'
}

type State = {
    balance: number
}

type Action = {
    type: string,
    payload: number
}

const reducer = (state: State = {balance: 0}, action: Action) => {
    let currentBalance = state.balance

    switch (action.type) {
        case ActionType.CREDIT:
            currentBalance -= action.payload
            break
        case ActionType.DEBIT:
            currentBalance += action.payload
            break
        case ActionType.UPDATE_BALANCE:
            currentBalance = action.payload
            break
        case ActionType.SUBTRACT_PERCENTAGE:
            currentBalance -= currentBalance * (action.payload / 100)
            break
        case ActionType.SET_BALANCE_WITH_TAX:
            currentBalance *= (1 - action.payload)
            break
    }

    return {
        balance: currentBalance
    }
}


let app = createStore(reducer, {
    balance: 1200
})

const actions: Action[] = [
    {type: 'UPDATE_BALANCE', payload: 1000.0},
    {type: 'CREDIT', payload: 200.0},
    {type: 'CREDIT', payload: 100.0},
    {type: 'SET_BALANCE_WITH_TAX', payload: 14.0},
    {type: 'DEBIT', payload: 250.0},
    {type: 'UPDATE_BALANCE', payload: 1000.0},
]

actions.forEach(action => {
    app.dispatch(action)
    console.log(`ActionType: ${action.type}, 
                 sum: ${action.payload}, 
                 currentBalance: ${app.getState()}`)
})