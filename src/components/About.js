import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const AboutButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: "1rem",
    padding: "0px 6px",
    backgroundColor: "#f8f8f8",
    borderColor: "#f8f8f8",
    fontFamily: ["inherit"].join(","),
    "&:hover": {
      backgroundColor: "#f8f8f8",
      borderColor: "#f8f8f8",
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#f8f8f8",
      borderColor: "#f8f8f8"
    },
    "&:focus": {
      boxShadow: "#f8f8f8"
    }
  }
})(Button);

export function AboutUs() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AboutButton
        href="#text-buttons"
        color="primary"
        onClick={handleClickOpen}
      >
        {t("About")}
      </AboutButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">WorkPlace</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black" }}>
            {t(
              "Do you want to evaluate your current or previous job? Are you looking for the best company to work for?"
            )}
          </DialogContentText>
          <DialogContentText style={{ color: "black" }}>
            {t("You are in the right place...")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
