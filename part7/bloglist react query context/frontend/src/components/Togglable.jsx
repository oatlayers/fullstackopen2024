import React from "react";
import { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Togglable = React.forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
