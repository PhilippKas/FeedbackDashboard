import React from 'react';
import { useState } from 'react'; 

const DateSelector = ({ onDateChange, initialStartDate, initialEndDate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onDateChange(formData.get('startDate'), formData.get('endDate'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label >From:</label>
          <input
            type="date"
            name="startDate"
            defaultValue={initialStartDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>To:</label>
          <input
            type="date"
            name="endDate"
            defaultValue={initialEndDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Update Date Range</button>
      </form>
    </div>
  );
};

export default DateSelector;