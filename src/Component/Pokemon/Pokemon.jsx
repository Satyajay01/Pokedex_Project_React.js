import { Link } from "react-router-dom";
import React from "react";
import "./Pokemon.css";

const Pokemon = ({ id, name, image }) => {
  return (
    <div className="pokemon">
      <Link to={`/pokemon/${id}`}>
      <div className="pokemon-name">{name}</div>
      <div><img className="pokemon-img" src={image} alt="" /></div>
      </Link>
    </div>
  );
};

export default Pokemon;


