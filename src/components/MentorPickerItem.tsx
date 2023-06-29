import React from "react";

interface MentorPickerItemProps {
  src: string;
}

const MentorPickerItem: React.FC<MentorPickerItemProps> = ({ src }) => {
  return (
    <button className="avatar join-item">
      <div className="w-36 rounded">
        <img src={src} alt="mentor" />
      </div>
    </button>
  );
};

export default MentorPickerItem;
