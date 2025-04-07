import React, { useState } from 'react';
import Box1 from './Box';
import Box2 from './Box';
import './TwoBoxes.css';

const TwoBoxes: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div className="two-boxes-container">
      <Box1
        boxName="Box 1"
        btnLabel="Increment Box 2"
        otherBoxCount={count2}
        onIncrement={() => setCount1((prev) => prev + 1)}
      />
      <Box2
        boxName="Box 2"
        btnLabel="Increment Box 1"
        otherBoxCount={count1}
        onIncrement={() => setCount2((prev) => prev + 1)}
      />
    </div>
  );
};

export default TwoBoxes;
