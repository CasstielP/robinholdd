// const LOAD_WATCHLISTS = "watchlists/loadWatchlists"
// const LOAD_SINGLEWATCHLIST = "watchlists/loadSingleWatchlist"
// const CREATE_WATCHLIST = "watchlists/createWatchlist"
// const UPDATE_WATCHLIST = "watchlists/updateWatchlist"
// const DELETE_WATCHLIST = "watchlists/deleteWatchlists"

// const loadWatchlists = (watchlists) => {
//     return {
//         type: LOAD_WATCHLISTS,
//         watchlists
//     }
// }

// const loadSingleWatchlist = (watchlist) => {
//     return {
//         type: LOAD_SINGLEWATCHLIST,
//         watchlist
//     }
// }

// const createNewWatchlist = (watchlist) => {
//     return {
//         type: CREATE_WATCHLIST,
//         watchlist
//     }
// }

// const deleteWatchlist = (watchlistId) => {
//     return {
//         type: DELETE_WATCHLIST,
//         watchlistId
//     }
// }

// const updateWatchlist = (watchlist) => {
//     return {
//         type: UPDATE_WATCHLIST,
//         watchlist
//     }
// }


// // ================= Thunk ==================
// export const getAllWatchlists = (userId) => async (dispatch) => {
//     // =============  not sure about path ==============
//     const res = await fetch(`/api/users/${userId}/watchlists`)
//     const data = await res.json()
//     if (res.ok) {
//         dispatch(loadWatchlists(data))
//     }
// }

// export const getSingleWatchlist = (id) => async (dispatch) => {
//     const res = await fetch(`/api/watchlists/${id}`)
//     const data = await res.json()
//     if (res.ok) {
//         dispatch(loadSingleWatchlist(data))
//     }
// }

// // -------------- Create new watchlist ---------------------
// export const createWatchlist = (watchlist, userId) => async (dispatch) => {
//     const res = await fetch(`/api/users/${userId}/watchlists`, {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(watchlist)
//     })
//     if (res.ok) {
//         const newWatchlist = await res.json()
//         dispatch(createNewWatchlist(newWatchlist, userId))
//         return newWatchlist
//     }
// }

// //------------- Update watchlist -----------------
// export const updateCurrWatchlist = (id, watchlist) => async (dispatch) => {
//     const res = await fetch(`/api/watchlists/${id}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(watchlist)
//     })
//     console.log("res in thunkkkkkk",res)
//     if(res.ok) {
//         const data = await res.json()
//         console.log("data in thunk update watchlist===========",data)
//         dispatch(updateWatchlist(data))
//         return data
//     }
// }


// //  ------------- Delete Watchlist ---------------
// export const deleteSingleList = (watchlistId) => async (dispatch) => {
//     const res = await fetch(`/api/watchlists/${watchlistId}`, {
//         method: "DELETE"
//     })
//     if (res.ok) {
//         await dispatch(deleteWatchlist(watchlistId))
//         return res
//     }
// }


// const initialState = { allWatchlists: {}, singleWatchlist: {} }
// const watchlistsReducer = (state = initialState, action) => {
//     let newState = {};
//     switch (action.type) {
//         case LOAD_WATCHLISTS:
//             newState = { ...state, allWatchlists: {}, singleWatchlist: {} }
//             Object.values(action.watchlists).map(watchlist => (
//                 newState.allWatchlists[watchlist.id] = { ...watchlist }
//             ))
//             return newState

//         case LOAD_SINGLEWATCHLIST:
//             newState = { allWatchlists: {}, singleWatchlist: {} }
//             newState.singleWatchlist = action.watchlist
//             return newState

//         case CREATE_WATCHLIST:
//             newState = {...state}
//             let id = action.watchlist.id
//             newState.allWatchlists[id] = action.watchlist
//             return newState

//         case DELETE_WATCHLIST:
//             newState = {
//                 singleWatchlist: {},
//                 allWatchlists: { ...state.allWatchlists }
//             }
//             delete newState.allWatchlists[action.watchlistId]
//             return newState

//         case UPDATE_WATCHLIST:
//             newState = { ...state }
//             newState.allWatchlists[action.watchlist.id] = action.watchlist
//             return newState

//         default:
//             return state
//     }
// }

// export default watchlistsReducer;

const LOAD_WATCHLISTS = "watchlists/loadWatchlists"
const LOAD_SINGLEWATCHLIST = "watchlists/loadSingleWatchlist"
const CREATE_WATCHLIST = "watchlists/createWatchlist"
const UPDATE_WATCHLIST = "watchlists/updateWatchlist"
const DELETE_WATCHLIST = "watchlists/deleteWatchlists"

const ADD_TO_WATCHLIST = "watchlists/addStocktoList"
const DELETE_FROM_WATCHLIST = "watchlist/removeStockFromList"

const addToWatchlist = (stock, watchlistId) => {
    return {
        type: ADD_TO_WATCHLIST,
        stock,
        watchlistId
    }
}

const deleteFromWatchlist = (userId, stockId) => {
    return {
        type: DELETE_FROM_WATCHLIST,
        userId,
        stockId

    }
}

const loadWatchlists = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}

const loadSingleWatchlist = (watchlist) => {
    return {
        type: LOAD_SINGLEWATCHLIST,
        watchlist
    }
}

const createNewWatchlist = (watchlist) => {
    return {
        type: CREATE_WATCHLIST,
        watchlist
    }
}

const deleteWatchlist = (watchlistId) => {
    return {
        type: DELETE_WATCHLIST,
        watchlistId
    }
}

const updateWatchlist = (watchlist) => {
    return {
        type: UPDATE_WATCHLIST,
        watchlist
    }
}

export const toWatchList = (stockId, watchlistId, updatedWatchlist) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/add`, {

        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(updatedWatchlist)
    })
    if (response.ok) {
        const stock = await response.json()
        dispatch(addToWatchlist(stock, watchlistId))
        // return stock
    }
}

export const fromWatchList = (userId, watchlistId, stockId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}/${stockId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        await dispatch(deleteFromWatchlist(userId, stockId))
    }
}


// ================= Thunk ==================
export const getAllWatchlists = (userId) => async (dispatch) => {
    // =============  not sure about path ==============
    const res = await fetch(`/api/users/${userId}/watchlists`)
    const data = await res.json()
    if (res.ok) {
        dispatch(loadWatchlists(data))
    }
}

export const getSingleWatchlist = (id) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${id}`)
    const data = await res.json()
    if (res.ok) {
        dispatch(loadSingleWatchlist(data))
    }
}

// -------------- Create new watchlist ---------------------
export const createWatchlist = (watchlist, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/watchlists`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    if (res.ok) {
        const newWatchlist = await res.json()
        dispatch(createNewWatchlist(newWatchlist, userId))
        return newWatchlist
    }
}

//------------- Update watchlist -----------------
export const updateCurrWatchlist = (id, watchlist) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    // console.log("res in thunkkkkkk", res)
    if (res.ok) {
        const data = await res.json()
        // console.log("data in thunk update watchlist===========", data)
        dispatch(updateWatchlist(data))
        return data
    }
}


//  ------------- Delete Watchlist ---------------
export const deleteSingleList = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlistId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        await dispatch(deleteWatchlist(watchlistId))
        return res
    }
}


const initialState = { allWatchlists: {}, singleWatchlist: {} }
const watchlistsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        // ======================
        case ADD_TO_WATCHLIST:
            newState = {
                allWatchlists: {
                    ...state.allWatchlists,
                }
            }
            newState.allWatchlists[action.watchlistId].watched_stocks[action.stock.id] = action.stock
            return newState
        // return {
        //     allWatchlists: {
        //         ...state.allWatchlists,
        //         allWatchlists[action.watchlistId]
        //     },
        //     singleWatchlist: {}
        // }

        case DELETE_FROM_WATCHLIST:
            newState = {
                allWatchlists: { ...state.allWatchlists },
                singleWatchlist: { ...state.singleWatchlist }
            }
            delete newState.singleWatchlist.watched_stocks[action.stockId]
            return newState
        // =========================

        case LOAD_WATCHLISTS:
            newState = { ...state, allWatchlists: {}, singleWatchlist: {} }
            Object.values(action.watchlists).map(watchlist => (
                newState.allWatchlists[watchlist.id] = { ...watchlist }
            ))
            return newState

        case LOAD_SINGLEWATCHLIST:
            newState = { allWatchlists: {}, singleWatchlist: {} }
            newState.singleWatchlist = action.watchlist
            return newState

        case CREATE_WATCHLIST:
            newState = { ...state }
            let id = action.watchlist.id
            newState.allWatchlists[id] = action.watchlist
            return newState

        case DELETE_WATCHLIST:
            newState = {
                singleWatchlist: {},
                allWatchlists: { ...state.allWatchlists }
            }
            delete newState.allWatchlists[action.watchlistId]
            return newState

        case UPDATE_WATCHLIST:
            newState = { ...state }
            newState.allWatchlists[action.watchlist.id] = action.watchlist
            return newState

        default:
            return state
    }
}

export default watchlistsReducer;