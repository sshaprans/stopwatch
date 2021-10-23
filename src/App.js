import React, {useState, useEffect} from "react";
import {interval, Subject} from "rxjs";
import { takeUntil } from "rxjs/operators";
import './App.css';


function App()  {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
        .pipe(takeUntil(unsubscribe$))
        .subscribe(() => {
          if (status === "run") {
            setSec(val => val + 1000);
          }
        });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  function btn(){
      if(status==="run"){
          return stop()
      }if (status === "stop" || status === "wait"){
          return start()
      }
  }

  const start = React.useCallback(() => {
    setStatus("run");
  }, []);

  const stop = React.useCallback(() => {
    setStatus("stop",);
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
  }, []);

  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);

  return (
      <div className="main-section">
          <div className="clock-holder">
              <div className="stopwatch">
                  <div>
                      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
                  </div>
                      <div>
                          <button className="stopwatch-btn stopwatch-btn-gre" onClick={btn}>Start/Stop</button>
                          <button className="stopwatch-btn stopwatch-btn-yel" onClick={wait}>Wait</button>
                          <button className="stopwatch-btn stopwatch-btn-red" onClick={reset}>Reset</button>
                  </div>
              </div>
          </div>
      </div>
  );
}


export default App;



