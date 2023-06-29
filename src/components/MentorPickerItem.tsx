import React from "react";

interface MentorPickerItemProps {
  src: string;
  onSelect: () => void;
  disabled: boolean;
  selected: boolean;
}

const MentorPickerItem: React.FC<MentorPickerItemProps> = ({
  src,
  onSelect,
  disabled,
  selected,
}) => {
  return (
    <button
      className="avatar join-item"
      onClick={onSelect}
      disabled={disabled || selected}
    >
      <div className="w-36 rounded">
        <img src={src} alt="mentor" />
      </div>
    </button>
  );
};

export default MentorPickerItem;
