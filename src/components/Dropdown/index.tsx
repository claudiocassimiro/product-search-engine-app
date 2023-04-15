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
    <div data-testid="dropdown" className={styles.dropdown}>
      {dropdownOptions.map((option, index) => {
        return (
          <span
            onClick={() => handleOption(option)}
            key={option}
            className={styles.dropdownOption}
            data-testid={`option-${index}`}
          >
            {option}
          </span>
        );
      })}
    </div>
  );
};

export default Dropdown;
