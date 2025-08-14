// Safety Controls Component
import React from 'react';

function SafetyControls({ onEmergencyStop }) {
  return (
    <div className="safety-controls">
      <button onClick={onEmergencyStop} className="emergency-stop">
        Emergency Stop
      </button>
      {/* Additional safety control elements can be added here */}
    </div>
  );
}

export default SafetyControls;
