interface ActionsBarProps {
  onCook: () => void;
  onClear: () => void;
  disabled: boolean;
}

export default function ActionsBar({ 
  onCook, 
  onClear, 
  disabled 
}: ActionsBarProps) {
  return (
    <div className="actions-bar">
      <button 
        className="cook-btn" 
        onClick={onCook}
        disabled={disabled}
      >
        🔥 Cook!
      </button>
      <button 
        className="clear-btn" 
        onClick={onClear}
      >
        🗑️ Clear
      </button>
    </div>
  );
}
