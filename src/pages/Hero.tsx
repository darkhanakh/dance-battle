import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Лучшие танцоры n!</h1>
          <p className="py-6">
            Лучшая танцевальная игра с нашими любими менторами, которая позволит
            нам окунуться в захватывающий мир ритма и движения. Эта игра
            предлагает уникальный опыт, объединяющий яркую графику,
            захватывающие треки и наших неподражаемых менторов.
          </p>
          <Link className="btn btn-primary" to={"/character-selection"}>
            Перейти к выбору персонажей
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
