import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(19),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Project = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{props.name}</Typography>
          {expanded === "panel1" ? (
            <Typography className={classes.secondaryHeading}></Typography>
          ) : (
            <Typography className={classes.secondaryHeading}>
              Click to see description
            </Typography>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{props.description}</Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button onClick={handleChange(false)} size="small">
            Cancel
          </Button>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to={`/projectslist/${props.id}`}
          >
            <Button size="small" color="primary">
              See Project
            </Button>
          </Link>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default Project;
