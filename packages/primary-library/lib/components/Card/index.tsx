import React, { memo } from 'react';

export const Card: React.FC<{ title: string }> = memo(({ title }) => {

  return (
    <div>
      卡片: {title}
    </div>
  );
});

Card.displayName = 'Card';
