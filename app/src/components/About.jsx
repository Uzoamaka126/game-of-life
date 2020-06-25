import React from "react";
import { Link as RouterLink } from 'react-router-dom';
export function About() {
  return (
    <div>
      <nav>
       
        <h2>About this game</h2>
      </nav>
      <div className="about-wrapper">
        <div className="rules-container">
          <h3 className="sub-heading">Rules:</h3>
          <p className="">
            The Game of Life is a zero-player game that is played by creating an
            initial configuration and observing how it evolves.
          </p>
          <ul>
            <li className="">
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li className="text-white">
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li className="text-white">
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li className="text-white">
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
            <li></li>
          </ul>
        </div>
        <div className="about-info">
          <h3>About This Algorithm</h3>
          <div className="about-info-text">
                      <p></p>
                      <p></p>
                      <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
