import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { setIsCartOpen, setItem, SetIsSearchOpen } from "../store";
import useDebounce from "../hooks/useDebounce";
import SearchList from "./SearchList";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [listSearchItem, setListSearchItem] = useState([]);
  const debounce = useDebounce(searchValue, 500);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const items = useSelector((state) => state.cart.items);
  const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);

  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const handleSearch = () => {
    const searchItem = items.filter((item) => {
      return item.attributes.name
        .toLowerCase()
        .includes(debounce.toLowerCase());
    });
    if (debounce !== "") {
      setListSearchItem(searchItem);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debounce]);

  const handleShowSearch = () => {
    dispatch(SetIsSearchOpen({}));
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
          <IconButton sx={{ color: "black" }} onClick={handleShowSearch}>
            {!isSearchOpen ? <SearchOutlined /> : <CloseOutlined />}
          </IconButton>

          {isSearchOpen && (
            <Box>
              <Box>
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                />
              </Box>
              <List
                sx={{
                  position: "absolute",
                  top: "100%",
                  // width: "25vw",
                  width: isNonMobile ? "30vw" : "50vw",
                  right: "10%",
                  maxHeight: "35vh",
                  overflowX: "auto",
                }}
              >
                {listSearchItem.map(({ id, attributes }) => (
                  <SearchList key={id} id={id} item={attributes} />
                ))}
              </List>
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
