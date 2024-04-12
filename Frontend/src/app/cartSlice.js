import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: true
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen;
    }
  }
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
