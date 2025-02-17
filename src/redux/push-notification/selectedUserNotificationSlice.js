import { createSlice } from "@reduxjs/toolkit";

export const selectedUserNotificationSlice = createSlice({
    name: 'userNotification',
    initialState: {
        users: [
        ]
    },

    reducers: {
        addUser: (state,action) => {
            state.users.push(action.payload);
            const { email } = action.payload;
            const userIndex = state.users.findIndex(user => user.email === email);
            if (userIndex !== -1) {
              state.users[userIndex].selected = true;
            }
        },

        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.email != action.payload);
            const { email } = action.payload;
            const userIndex = state.users.findIndex(user => user.email === email);
            if (userIndex !== -1) {
              state.users[userIndex].selected = false;
            }
        },


          
        removeAllUsers: (state) => {
            state.users = []
        }

    }
});

export const {addUser, removeUser, removeAllUsers} = selectedUserNotificationSlice.actions;
export default selectedUserNotificationSlice.reducer;