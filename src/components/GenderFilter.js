import React from "react";
import '../css/filter.css'
const GenderFilter = ({value, onChange}) => {

    return (
        <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
    >
        <option value="">Все</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
        <option value="n/a">Не определен</option>
    </select>

    )
}

export default GenderFilter;