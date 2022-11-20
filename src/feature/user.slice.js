import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        users: null,
        token: null
    },
    reducers: {
        //store token in redux store
        setTokenData: (state, {payload}) => {
            state.token = payload;
        },
        //store user's data in redux store
        setUserData: (state, {payload}) => {
            state.users = payload;
        },
        //store user's data change in redux store
        editUserData: (state, {payload}) => {
            state.users.body.firstName = payload[0];
            state.users.body.lastName = payload[1];
        },
        //action to empty the store and then disconnect the user
        deleteDataUser: (state) => {
            state.users = null;
            state.token = null;
        }
    }
})

export const {setUserData, setTokenData, editUserData, deleteDataUser} = userSlice.actions;
export default userSlice.reducer;