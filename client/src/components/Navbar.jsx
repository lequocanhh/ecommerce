import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { Badge, Box, IconButton, Input } from "@mui/material";
import { setIsCartOpen, setItem } from "../store";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const items = useSelector((state) => state.cart.items);
  const getItems = async () => {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
      }
    );
    const itemJson = await items.json();
    dispatch(setItem(itemJson.data));
  };
  const handleSearch = () => {
    setShowSearch(true);
    const searchItem = items.filter((item) => {
      return item.attributes.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    if (searchValue !== "") {
      dispatch(setItem(searchItem));
    } else {
      getItems();
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      bgcolor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          ECOMMERCE
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }} onClick={handleSearch}>
            <SearchOutlined />
          </IconButton>
          {showSearch && (
            <Box onBlur={() => setShowSearch(false)}>
              <Box>
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                />
              </Box>
            </Box>
          )}

          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>

          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>

          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;