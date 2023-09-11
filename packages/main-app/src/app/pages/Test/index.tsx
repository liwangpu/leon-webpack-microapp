import { Button } from 'antd';
// import { SimplePage } from 'leon-rc-toolkit';
import React, { memo } from 'react';

const SimpleComponent: React.FC = memo(props => {

  const handleTest = () => {
    console.log(`test work!`,);
  };


  return (
    // <SimplePage header={(
    //   <>
    //     <Button type='primary' onClick={handleTest}>测试</Button>
    //   </>
    // )}>

    //   <h3>1111</h3>
    // </SimplePage>

    <div>
      <Button type='primary' onClick={handleTest}>测试1111</Button>
    </div>
  );
});

SimpleComponent.displayName = 'SimpleComponent';

export default SimpleComponent;