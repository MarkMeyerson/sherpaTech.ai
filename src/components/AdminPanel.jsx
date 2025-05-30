import React, { useState } from 'react';

const AdminPanel = ({ contentRepository, updateContent }) => {
  const [newContent, setNewContent] = useState({});

  const handleAddContent = (week, type, content) => {
    const updatedWeekContent = {
      ...contentRepository[`week${week}`],
      [type]: [...(contentRepository[`week${week}`][type] || []), content],
    };

    updateContent(`week${week}`, updatedWeekContent);
  };

  const handleRemoveContent = (week, type, contentId) => {
    const updatedWeekContent = {
      ...contentRepository[`week${week}`],
      [type]: contentRepository[`week${week}`][type].filter((item) => item.id !== contentId),
    };

    updateContent(`week${week}`, updatedWeekContent);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div>
        <h3>Add Content</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddContent(newContent.week, newContent.type, newContent.content);
          }}
        >
          <input
            type="number"
            placeholder="Week"
            onChange={(e) => setNewContent({ ...newContent, week: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (videos, readings, etc.)"
            onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
          />
          <textarea
            placeholder="Content"
            onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
          ></textarea>
          <button type="submit">Add Content</button>
        </form>
      </div>
      <div>
        <h3>Remove Content</h3>
        {/* Implement content removal UI */}
      </div>
    </div>
  );
};

export default AdminPanel;
