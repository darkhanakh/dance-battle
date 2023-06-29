import React from "react";
import {
  CurrentPlayer,
  SelectedMentors,
} from "../../pages/MentorSelection.tsx";

interface MentorCardProps {
  selectedMentors: SelectedMentors;
  player: CurrentPlayer;
}

const MentorCard: React.FC<MentorCardProps> = ({ selectedMentors, player }) => {
  return (
    <div className="first-dancer max-w-md card">
      {selectedMentors[player] && (
        <>
          <h2 className="text-center mb-1 text-2xl">
            Выбор {player === "player1" ? "первого " : "второго"} игрока
          </h2>
          <img
            className="w-fit h-96"
            src={selectedMentors[player]?.src}
            alt="Selected Mentor"
          />
        </>
      )}
    </div>
  );
};

export default MentorCard;
