import {
    STORE_REQUEST_INIT,
    STORE_CURRENT_PATH,
    STORE_REQUEST_FAILED,
    STORE_REQUEST_SUCCEEDED
} from "./actions";

// Partial global store for requests data management
const initialState = {
    list: [],
    currentPath: ''
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set init request store data
        case STORE_REQUEST_INIT:
            nextState = {...state, list: setRequestProcessing(state.list, action.scope, false, true)};
            return nextState || state;
        // Resolve event to set failed request store data
        case STORE_REQUEST_FAILED:
            nextState = {...state, list: setRequestProcessing(state.list, action.scope, true, false)};
            return nextState || state;
        // Resolve event to set succeeded request store data
        case STORE_REQUEST_SUCCEEDED:
            nextState = {...state, list: setRequestProcessing(state.list, action.scope, false, false)};
            return nextState || state;
        // Resolve event to set succeeded request store data
        case STORE_CURRENT_PATH:
            nextState = {...state, currentPath: action.path};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

// Get next state
function setRequestProcessing(requests, scope, failed = false, loading = false) {
    // Check if scope is already registered
    if(requests.find(item => item.scope === scope)) {
        // Then update
        requests = requests.map(item => {
            if(item.scope === scope) {
                item.failed = failed;
                item.loading = loading;
            }
            return item;
        });
        // Else add
    } else requests.push({failed, loading, scope});
    return requests;
}

export default reduce