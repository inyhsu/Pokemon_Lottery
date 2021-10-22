import './App.css';

import Ball from './components/Ball'

function App() {
  let balls = [];
  for (var i = 0; i < 100 + Math.random() * 100; i++) {
    balls.push(<Ball number={i} key={i}/>);
  }
  return (
    <>
      <div className="container">
        <div className="circle">
          { balls }
        </div>
      </div>
    </>
  );
}

export default App;
