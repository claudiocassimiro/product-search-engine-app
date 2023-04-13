import { useState } from "react";
import styles from "./styles.module.css";

interface DropdownProps {
  dropdownOptions: string[];
  handleDropdown: (value: boolean) => void;
  handleSelectedOption: (value: string) => void;
}

const Dropdown = ({
  dropdownOptions,
  handleDropdown,
  handleSelectedOption,
}: DropdownProps) => {
  const handleOption = (option: string) => {
    handleSelectedOption(option);
    handleDropdown(false);
  };
  return (
    <div className={styles.dropdown}>
      {dropdownOptions.map((option) => {
        return (
          <span
            onClick={() => handleOption(option)}
            key={option}
            className={styles.dropdownOption}
          >
            {option}
          </span>
        );
      })}
    </div>
  );
};

export default Dropdown;
