import * as React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, IconButton, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import { SavedComponent } from "global/Enum";

import ComponentService from "services/admin/component/ComponentService";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import WishListModalBody from "./WishListModalBody";

export default function WishListModal(props) {
  const [open, setOpen] = React.useState(false);
  const { allFunctions } = props;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setComponentToFavorate = async (values) => {
    dispatch(setAddLoading(true));

    let svalue;
    let shtml;
    let properties;
    if (allFunctions.currentComponentData) {
      svalue = JSON.stringify(
        allFunctions.currentComponentData.selected_Values,
      );
      shtml = allFunctions.currentComponentData.html;
      properties = JSON.stringify(allFunctions.currentComponentData.properties);
    } else {
      let sobj = allFunctions.componentHtml.filter((element) => {
        return element.uid === allFunctions.currentComponent;
      })[0];
      if (sobj) {
        svalue = JSON.stringify(sobj.selected_Values);
        shtml = sobj.html;
        properties = JSON.stringify(sobj.properties);
      }
    }

    const data = {
      cmscomponentmodel: {
        id: 0,
        comp_Name: values?.componentNameTextBox,
        comp_Image: "",
        comp_Catname: SavedComponent,
        content: "",
        html: shtml,
        properties: properties,
        created_At: "2023-07-27T10:19:05.019Z",
        updated_At: "2023-07-27T10:19:05.019Z",
        selected_Values: svalue,
      },
    };
    ComponentService.createComponent(data)
      .then(() => {
        dispatch(setAddLoading(false));
        dispatch(
          setAlertMessage({ type: "success", message: "Saved Successfully" }),
        );
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  };

  const handleSaveData = async (values) => {
    await setComponentToFavorate(values);
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        title="Wishlist"
        onClick={handleClickOpen}
        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent"
      >
        <span className="material-icons-outlined text-sm">favorite</span>
      </button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="customized-dialog-title" sx={{ padding: 4 }}>
          <Typography variant="h6" component="span">
            Save Your Favorate Component
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              top: 10,
              right: 10,
              position: "absolute",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <div className="sr-only">Close</div>
            <svg className="w-4 h-4 fill-current">
              <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
            </svg>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="overflow-auto max-w-4xl w-full max-h-full">
            <Formik
              enableReinitialize
              initialValues={{ componentNameTextBox: "" }}
              onSubmit={handleSaveData}
            >
              {({ values, errors }) => {
                return (
                  <>
                    <Form>
                      <Box
                        noValidate
                        component="form"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <WishListModalBody handleClose={handleClose} />
                      </Box>
                      <Box className="flex justify-end mt-2">
                        <button
                          type="submit"
                          className="btn pl-6 bg-indigo-500 hover:bg-indigo-600 text-white"
                        >
                          Submit
                        </button>
                      </Box>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
