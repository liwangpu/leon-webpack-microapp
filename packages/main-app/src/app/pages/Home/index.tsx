import { Button } from 'antd';
import { SimplePage } from 'leon-rc-toolkit';
import React, { memo } from 'react';

const SimpleComponent: React.FC = memo(props => {

  const handleTest = () => {
    console.log(`test work!`,);
  };


  return (
    <SimplePage header={(
      <>
        <Button type='primary' onClick={handleTest}>测试</Button>
      </>
    )}>


    </SimplePage>
  );
});

SimpleComponent.displayName = 'SimpleComponent';

export default SimpleComponent;