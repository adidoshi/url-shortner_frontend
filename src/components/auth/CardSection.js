import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Hidden } from "@material-ui/core";
import { BarChart } from "@material-ui/icons";
import { baseUrl } from "../../apiCall";
import axios from "axios";

const CardSection = ({ createdAt, fullUrl, short, urlName, copyLink, _id }) => {
  const shortUrl = `${baseUrl}/${short}`;
  const [clickCount, setClickCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const getClicks = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        let url = `${baseUrl}/count/${urlName}`;

        const { data } = await axios.get(url, config);

        setClickCount(data);
      } catch (error) {
        console.log(`${error}`);
      }
    };
    getClicks();
  }, [user.token, urlName]);

  const delHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      let url = `${baseUrl}/${_id}`;

      await axios.delete(url, config);
      window.location.reload();
    } catch (error) {
      console.log(`${error.response.data}`);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" variant="overline">
            Created At {`${createdAt}`}
          </Typography>
          <Box my={2}>
            <Typography variant="h5">{urlName}</Typography>
            <Typography
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {fullUrl}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <a
              href={`${baseUrl}/${short}`}
              target="_blank"
              rel="noreferrer"
              color="primary">
              {`${baseUrl}/${short}`}
            </a>
            <Box mx={2}>
              <Button
                onClick={() => copyLink(shortUrl)}
                color="primary"
                size="small"
                variant="outlined">
                Copy
              </Button>
            </Box>
            <Hidden only="xs">
              <Button
                color="secondary"
                size="small"
                onClick={delHandler}
                variant="contained"
                disableElevation>
                Delete
              </Button>
            </Hidden>
          </Box>
        </Box>

        <Hidden only="xs">
          <Box>
            <Box display="flex" justifyContent="center">
              <Typography>{clickCount}</Typography>
              <BarChart />
            </Box>
            <Typography variant="overline">Total Clicks</Typography>
          </Box>
        </Hidden>
      </Box>
    </>
  );
};

export default CardSection;
