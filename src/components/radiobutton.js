import React from "react";

export function RadioButton({ text, value, checked, onRadioChange }) {
  return (
    <div class="radio">
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={e => onRadioChange(e.target.value)}
        />
        <span className="selected">{text}</span>
      </label>
    </div>
  );
}
