import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Switch from "@material-ui/core/Switch";
import { ThemeContext } from "../context";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Clear } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      display: "block",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      marginRight: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    progress: {
      position: "absolute",
      top: "25%",
      right: "5%",
    },

    themeLable: {
      fontSize: "12px",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);
interface IProps {
  onChange?: (text?: string) => void;
  value?: string;
  showIndicator?: boolean;
}

const SearchAppBar: React.FC<IProps> = ({ onChange, value, showIndicator }) => {
  const classes = useStyles();
  const { theme, setTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme();
    setChecked(event.target.checked);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Latest news
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={value}
              placeholder="Search…"
              onChange={onTextChange}
              endAdornment={
                <InputAdornment position="end">
                  {!showIndicator && value.length > 0 ? (
                    <IconButton
                      aria-label="Clear search text"
                      onClick={() => onChange && onChange("")}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <Clear />
                    </IconButton>
                  ) : null}
                </InputAdornment>
              }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            {showIndicator && (
              <CircularProgress
                size={20}
                color="inherit"
                className={classes.progress}
              />
            )}
          </div>

          <FormControlLabel
            classes={{ label: classes.themeLable }}
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                name="theme"
                size="small"
              />
            }
            label={theme === "dark" ? "Dark" : "Light"}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default SearchAppBar;
