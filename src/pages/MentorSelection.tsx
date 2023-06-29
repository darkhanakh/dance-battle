import React from "react";
import MentorPickerItem from "../components/MentorPickerItem.tsx";

const MentorSelection: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-between">
        <div className="first-dancer"></div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl mb-3">Выбери своего ментора</h1>
          <div className="join mb-3">
            <MentorPickerItem src="../../public/mentor_1.jpg" />
            <MentorPickerItem src="../../public/mentor_2.jpg" />
            <MentorPickerItem src="../../public/mentor_3.jpg" />
            <MentorPickerItem src="../../public/mentor_4.jpg" />
          </div>
          <button className="btn btn-primary">Начать игру</button>
        </div>
        <div className="second-dancer"></div>
      </div>
    </div>
  );
};

export default MentorSelection;
