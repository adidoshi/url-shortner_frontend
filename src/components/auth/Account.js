import React, { Fragment, useCallback, useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import CardSection from "./CardSection";
import Modal from "./Modal";
import copy from "copy-to-clipboard";
import { baseUrl } from "../../apiCall";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Account = () => {
  const [info, setInfo] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        let url = `${baseUrl}/urlRes`;
        setApiLoading(true);
        const { data } = await axios.get(url, config);
        setApiLoading(false);
        setInfo(data);
      } catch (error) {
        toast.error(`${error.response.data}`);
        setApiLoading(false);
      }
    };
    getData();
  }, [user.token]);

  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkToaster(true);
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <Snackbar
        open={newLinkToaster}
        autoHideDuration={2000}
        onClose={() => setNewLinkToaster(false)}
        message="Link copied to clipboard"
      />
      {openModal && <Modal handleClose={() => setOpenModal(false)} />}
      <Navbar />

      <Box mt={{ xs: 3, sm: 5 }} mb={5} p={{ xs: 2, sm: 0 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}>
                Create new
              </Button>
            </Box>
            <Box display="flex" justifyContent="center">
              {apiLoading && <CircularProgress color="primary" />}
            </Box>
            {info.map((link, index) => (
              <Fragment key={link._id}>
                <CardSection {...link} copyLink={handleCopyLink} />
                {index !== info.length - 1 && (
                  <Box my={3}>
                    <Divider />
                  </Box>
                )}
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
