import React, { memo } from 'react';

const SimpleComponent: React.FC = memo(props => {

  const handleTest = () => {
    console.log(`test work!`,);
  };

  return (
    <div>
      home
    </div>
  );
});

SimpleComponent.displayName = 'SimpleComponent';

export default SimpleComponent;