import React from "react";
import { Link } from "react-router-dom";
export function About() {
  return (
    <div className="about-container">
      <nav className="about-nav">
        <Link to="/">Go back</Link>
        <h2>About this algorithm:</h2>
      </nav>
      <div className="about-wrapper">
        <div className="rules-container">
          <h3 className="sub-heading">Rules:</h3>
          <p className="">
            The Game of Life is a zero-player game that is played by creating an
            initial configuration and observing how it evolves.
          </p>
          <ul className="rules-ui">
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
        </div>
        <div className="about-info">
          <h3>About the Creator</h3>
          <div className="about-info-text">
            <p>
              Conway was born on 26 December 1937 in Liverpool, the son of Cyril
              Horton Conway and Agnes Boyce. He became interested in
              mathematics at a very early age. By the time he was 11, his
              ambition was to become a mathematician.
            </p>
            <p style={{ marginTop: "10px" }}>
              Conway was especially known for the invention of the Game of Life,
              one of the early examples of a cellular automaton. His initial
              experiments in that field were done with pen and paper, long
              before personal computers existed. Since the game was introduced
              by Martin Gardner in Scientific American in 1970, it has spawned
              hundreds of computer programs, web sites, and articles. The game
              has helped launch a new branch of mathematics, the field of
              cellular automata.
            </p>
            <p style={{ marginTop: "10px", marginBottom: "10px" }}>The Game of Life is known to be Turing complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
