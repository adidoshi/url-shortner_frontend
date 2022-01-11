import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { baseUrl } from "../../apiCall";
import axios from "axios";

const Modal = ({ handleClose }) => {
  const [fullUrl, setFullUrl] = useState("");
  const [urlName, setUrlName] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkToaster, setLinkToaster] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const shortUrlHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLinkLoading(true);
      await axios.post(
        `${baseUrl}/shortUrls`,
        { urlName, fullUrl, short: urlName },
        config
      );
      setLinkLoading(false);
      setLinkToaster(true);
      setUrlName("");
      setFullUrl("");
      window.location.reload();
    } catch (err) {
      console.log(`${err.response.data}`);
      setLinkLoading(false);
    }
  };
  return (
    <>
      <Snackbar
        open={linkToaster}
        autoHideDuration={2000}
        onClose={() => setLinkToaster(false)}
        message="Short Url created successfully!"
      />
      <Dialog open={true} onClose={handleClose} fullWidth>
        <Box display="flex" justifyContent="center" marginTop={1}>
          {linkLoading && <CircularProgress color="primary" />}
        </Box>
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            Create short URL
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              fullWidth
              variant="filled"
              label="Name"
              onChange={(e) => setUrlName(e.target.value)}
              value={urlName}
            />
          </Box>
          <TextField
            fullWidth
            variant="filled"
            label="Long URL"
            onChange={(e) => setFullUrl(e.target.value)}
            value={fullUrl}
          />
        </DialogContent>
        <DialogActions>
          <Box mr={2} my={1}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              disabled={linkLoading ? true : false}
              onClick={shortUrlHandler}>
              Short URL
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
