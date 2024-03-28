import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ProductModalBody from "./addProductModalBody";
import { useState } from "react";

export default function AddProductsDialog({
  selectedProducts,
  setSelectedProducts,
  setIsEdit,
  storeId,
  setSaveDataToggleFlag,
  saveDataToggleFlag,
  setLoading,
  loading,
}) {
  const [open, setOpen] = React.useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    if (setIsEdit) {
      setIsEdit(false);
    }
    setCheckedProducts([...selectedProducts]);
  };

  const handleClose = () => {
    setOpen(false);
    setCheckedProducts([]);
  };

  const handleSaveData = () => {
    setSelectedProducts([...checkedProducts]);
    setSaveDataToggleFlag(true);
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
      >
        {" "}
        Add Products{" "}
      </button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <ProductModalBody
              checkedProducts={checkedProducts}
              setCheckedProducts={setCheckedProducts}
              storeId={storeId}
              handleClose={handleClose}
              setLoading={setLoading}
              loading={loading}
            />
          </Box>
          <Box className="flex justify-end mt-2 mx-8">
            <button
              className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn pl-6 bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={handleSaveData}
            >
              Save
            </button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
