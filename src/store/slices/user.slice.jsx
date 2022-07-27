import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const userSlice = createSlice({
	name: 'user',
    initialState: "",
    reducers: {
        changeUserName: (state, action) => {
            return action.payload
        }
    }
})

export const { changeUserName, logout  } = userSlice.actions;

export default userSlice.reducer;