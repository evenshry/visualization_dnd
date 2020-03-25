import React, { useState, useMemo, useEffect } from 'react';

interface Props {
  count: number;
}

function JOKER(props: Props) {
  const [count, setCount] = useState(props.count);
  useEffect(() => {
    console.log("I am JOKER's useEffect--->", props.count);
    setCount(props.count);
  }, [props.count]);

  console.log("I am JOKER's  render-->", count);
  return (
    <div>
      <p style={{ color: 'red' }}>JOKER: You clicked {count} times</p>
    </div>
  );
}

function DC() {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  const memoizedJOKER = useMemo(() => <JOKER count={count} />, [count]);

  function handleClick() {
    setCount(count + 1);
    setSum(sum + 1);
    console.log('---click---');
    console.log('\n');
  }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>DC: You clicked {count} times</p>
      <p>now this is {sum} times</p>
      {memoizedJOKER}
    </div>
  );
}

export default DC;
