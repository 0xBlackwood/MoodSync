import React, { useState } from 'react';

interface NoteInputProps {
  onNoteChange: (note: string) => void;
  placeholder?: string;
}

const NoteInput: React.FC<NoteInputProps> = ({ 
  onNoteChange, 
  placeholder = "Add a note about your mood (optional)..." 
}) => {
  const [note, setNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);
    onNoteChange(value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!note.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={note}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={isExpanded ? 3 : 1}
        className="w-full p-3 border border-gray-200 rounded-lg resize-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-200"
      />
      {note.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          {note.length}/280 characters
        </p>
      )}
    </div>
  );
};

export default NoteInput;