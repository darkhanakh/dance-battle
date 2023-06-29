import React, { useState } from "react";
import MentorPickerItem from "../components/mentor-selection/MentorPickerItem.tsx";
import data from "../../data.json";
import MentorCard from "../components/mentor-selection/MentorCard.tsx";

interface PlayersMentor {
  name: string;
  src: string;
}

export interface SelectedMentors {
  player1: PlayersMentor | null;
  player2: PlayersMentor | null;
}

export type CurrentPlayer = "player1" | "player2";

const MentorSelection: React.FC = () => {
  const mentors: PlayersMentor[] = data;

  const [selectedMentors, setSelectedMentors] = useState<SelectedMentors>({
    player1: null,
    player2: null,
  });
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>("player1");

  const handleMentorSelection = (mentor: { name: string }) => {
    if (
      selectedMentors.player1?.name === mentor.name ||
      selectedMentors.player2?.name === mentor.name
    ) {
      return;
    }

    setSelectedMentors((prevSelectedMentors) => ({
      ...prevSelectedMentors,
      [currentPlayer]: mentor,
    }));

    if (currentPlayer === "player1") {
      setCurrentPlayer("player2");
    }
  };

  const renderPlayer = (player: "player1" | "player2") =>
    player === "player1" ? "Первый игрок" : "Второй игрок";

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-between">
          <MentorCard selectedMentors={selectedMentors} player="player1" />
          <div className="flex flex-col justify-center items-center mx-5">
            <h1 className="text-primary text-4xl mb-3">
              Выбери своего ментора
            </h1>
            <div className="join mb-3 flex-wrap max-w-xl">
              {mentors.map((mentor) => (
                <MentorPickerItem
                  key={mentor.name}
                  src={mentor.src}
                  onSelect={() => handleMentorSelection(mentor)}
                  disabled={selectedMentors[currentPlayer] !== null}
                  selected={
                    selectedMentors.player1 === mentor ||
                    selectedMentors.player2 === mentor
                  }
                />
              ))}
            </div>
            {selectedMentors.player1 && selectedMentors.player2 ? (
              <button className="btn btn-primary">Начать игру</button>
            ) : (
              <p className=" text-xl">
                {renderPlayer(currentPlayer)} - Выбери ментора
              </p>
            )}
          </div>
          <MentorCard selectedMentors={selectedMentors} player="player2" />
        </div>
      </div>
    </>
  );
};

export default MentorSelection;
