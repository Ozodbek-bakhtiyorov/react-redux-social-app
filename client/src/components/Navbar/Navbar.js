import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";
import SearchModal from "../SearchModal";
import SearchIcon from "@mui/icons-material/Search";
import { useDisableScroll } from "../../hooks/useDisableScroll";
import PostAddIcon from '@mui/icons-material/PostAdd'
import logo from '../../img/logo.png'
import HomeIcon from '@mui/icons-material/Home'
const Navbar = () => {
  const history = useHistory();

  const [pages, setPages] = useState([]);

  const [isActive, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const [findeduser, setFindeduser] = useState([]);
  const { state, dispatch } = useContext(Usercontext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const logoutandler = () => {
    localStorage.clear();
    history.push("/signin");
    dispatch({ type: "CLEAR" });
  };

  const settings = [
    { title: "Profile", path: "/profile" },
    { title: "Logout", path: "/logout", action: () => logoutandler() },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const searchUser = (query) => {
    setSearch(query);
    fetch("/searchuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((result) =>setFindeduser(result));
  };

  useEffect(function(){
    if (state) {
      setPages([{ icon:<PostAddIcon style={{fontSize:30}} />,path: "/createpost" }]);
    } else {
      setPages([{ title: <HomeIcon/>, path: "/signin" }]);
    }
  }, [state]);
  useDisableScroll(isActive);
  return (
    <AppBar position="sticky" sx={{ background: "#064663" }}>
      <SearchModal
        setSearch={searchUser}
        search={search}
        isActive={isActive}
        setActive={setActive}
        findedusers = {findeduser}
      />

      <Container>
        <Toolbar disableGutters>
          <Link to={state ? "/" : "/signin"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: "flex" }}
            >
              <Avatar alt="logo" sx={{width:50}} src={logo}/>
            </Typography>
          </Link>
        
          <Box
            sx={{
              flexGrow: 1,
              display: {  md: "flex" },
              justifyContent: "flex-end",
              marginRight: {xs:1,md:2},
            }}
          >
          
          </Box> 
          {state&&<Link to={state ? "/" : "/signin"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: {xs:1, md:2}, display:'flex' }}
            >
              <IconButton sx={{color:'white'}}>
                <i className="material-icons">home</i>
              </IconButton>
            </Typography>
          </Link>}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr:{xs:1,md:2}, display: "flex" }}
          >
            <IconButton onClick={() => setActive(true)} sx={{ color: "white" }}>
              <SearchIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Typography>

          {state && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {state.avatar ? (
                    <Avatar alt={state.name} src={state.avatar} />
                  ) : (
                    <p
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        borderRadius: "50%",
                        fontWeight: "500",
                        background: "red",

                        textTransform: "uppercase",
                      }}
                    >
                      {state.name.slice(0, 1)}
                    </p>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <MenuItem
                    key={i}
                    onClick={(e) => {
                      handleCloseNavMenu(e);
                      setting.action && setting.action();
                    }}
                  >
                    <Typography textAlign="center">
                      <Link to={setting.path}>{setting.title}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
