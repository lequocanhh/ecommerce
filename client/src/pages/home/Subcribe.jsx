import React, { useState } from "react";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { Box, Divider, IconButton, InputBase, Typography } from "@mui/material";

const Subcribe = () => {
  const [email, setEmail] = useState("");
  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subcribe To Our NewsLetter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      <Box
        padding="2px 4px"
        margin="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        bgcolor="#F2F2F2"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider sx={{ height: 28, margin: 0.5 }} orientation="vertical" />
        <Typography sx={{ padding: "10px", ":hover": { cursor: "pointer" } }}>
          Subcribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subcribe;
