import { Alert, AlertTitle, Box } from "@mui/material";
import React from "react";

const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order -{" "}
        <strong>Congrats on making your purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
