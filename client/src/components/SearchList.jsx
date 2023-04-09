import React from "react";
import {
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetIsSearchOpen } from "../store";

const SearchList = ({ showSearch, id, item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, shortDescription, image } = item;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  const handleClick = () => {
    navigate(`/item/${id}`);
    dispatch(SetIsSearchOpen({}));
  };

  return (
    <ListItem
      onClick={handleClick}
      sx={{
        bgcolor: "#ffffffed",
        width: "100%",
        height: "7vh",
        borderBottom: "1px solid #ccc",

        "&:hover": {
          cursor: "pointer",
          bgcolor: "#000000d4",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar src={`http://localhost:1337${url}`} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={shortDescription}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
    </ListItem>
  );
};

export default SearchList;
