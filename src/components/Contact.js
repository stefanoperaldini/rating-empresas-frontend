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

const ContactButton = withStyles({
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
      boxShadow: '0 0 0 0.2rem rgba(248,248,248,.5)'
    }
  }
})(Button);

export function ContactUs() {
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
      <ContactButton
        href="#text-buttons"
        color="primary"
        onClick={handleClickOpen}
      >
        {t("Contact")}
      </ContactButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ color: "black", fontWeight: "bold" }}>
          {t("We are here!")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black", fontWeight: "bold" }}>
            E-mail:
          </DialogContentText>
          <DialogContentText style={{ color: "black" }}>
            stefano.peraldini@gmail.com
          </DialogContentText>
          <DialogContentText style={{ color: "black" }}>
            patorive@gmail.com
          </DialogContentText>
          <DialogContentText style={{ color: "black", fontWeight: "bold" }}>
            LinkedIn:
          </DialogContentText>
          <DialogContentText style={{ color: "black" }}>
            <a href="https://www.linkedin.com/in/stefano-peraldini-software-developer/" title="Link Linkedin Stefano Peraldini">https://www.linkedin.com/in/stefano-peraldini-software-developer/</a>
          </DialogContentText>
          <DialogContentText style={{ color: "black" }}>
            <a href="https://www.linkedin.com/in/patricia-orive-a-developer/" title="Link Linkedin Patricia Orive Agras">https://www.linkedin.com/in/patricia-orive-a-developer/</a>
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
