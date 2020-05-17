import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./Project";
import { Container } from "@material-ui/core";

const ProjectsList = () => {
  const [listofProj, setListofProj] = useState([]);

  console.log("data", listofProj);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get(`http://localhost:5000/api/projects`)
      .then((res) => {
        // console.log(res)
        setListofProj(res.data);
      })
      .catch((err) => {
        console.log("fetchingProjectError", err);
      });
  };

  return (
    <section className="cardSection">
      <Container maxWidth="lg">
        <div style={{ textAlign: "left" }}>
          <h2 className="cardCont">Projects List</h2>
        </div>

        {listofProj.map((proj, index) => (
          <div key={index} className="cardCont">
            <Project
              id={proj.id}
              name={proj.name}
              description={proj.description}
            />
          </div>
        ))}
      </Container>
    </section>
  );
};

export default ProjectsList;
