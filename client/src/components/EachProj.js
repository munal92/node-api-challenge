import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
  },
}));

const EachProj = () => {
  const [detailofProj, setdetailofProj] = useState([]);
  const { id } = useParams();
  const { url } = useRouteMatch();

  console.log("id: ", id, " url: ", url, " detailof Proj: ", detailofProj);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((res) => {
        // console.log(res)
        setdetailofProj(res.data);
      })
      .catch((err) => {
        console.log("fetchingProjectError", err);
      });
  }, [id]);

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <section className="cardSection">
      <Container maxWidth="lg">
        <div>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {detailofProj.name}
              </Typography>

              <Typography variant="body2" component="p">
                {detailofProj.description}
              </Typography>
            </CardContent>

            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <CardActions>
                  <Button size="small">Actions</Button>
                </CardActions>
              </ExpansionPanelSummary>

              {detailofProj.actions
                ? detailofProj.actions.map((action, index) => (
                    <div key={index}>
                      <Divider />

                      <ExpansionPanelDetails>
                        <Typography>
                          Description: {action.description}
                          <br />
                        </Typography>
                      </ExpansionPanelDetails>

                      <ExpansionPanelDetails>
                        <Typography>Notes :{action.notes}</Typography>
                      </ExpansionPanelDetails>
                    </div>
                  ))
                : ""}

              <Divider />
              <ExpansionPanelActions>
                <Button onClick={handleChange(false)} size="small">
                  CANCEL
                </Button>
                <Button color="secondary" size="small">
                  DELETE
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default EachProj;
