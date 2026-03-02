import "../styles/options.css";

// current api doesn't support multiple choice so the component is made for selecting only one option
export default function Options({ options, onChange, checkedOption }) {
    return (
        <div className="filter-dropdown">
            {options.map((option) => (
                <label key={option} className="option">
                    <input
                        type="radio"
                        name="filter"
                        onChange={() => onChange(option)}
                        checked={checkedOption === option}
                    />
                    <span>{option}</span>
                </label>
            ))}
                <label className="option">
                    <input
                        type="radio"
                        name="filter"
                        checked={checkedOption == null}
                        onChange={() => onChange(null)}
                    />
                    <span>all</span>
                </label>
            </div>
            );
}