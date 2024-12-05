import './App.css';
import React, { useState, useEffect } from 'react';
import api from './util/api';

function App() {
  const [data, setData] = useState([]);
  const [faces, setFaces] = useState([]);
  const [lastFaceId, setLastFaceId] = useState();

  const mainurl = 'https://qimeng.blob.core.windows.net/';
  const token =
    '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2025-01-04T06:06:07Z&st=2024-12-04T22:06:07Z&spr=https,http&sig=hYqROTQsR5I39nYDJ2smSQuqVEM1pjfvPnLxh%2FKprVw%3D';
  useEffect(() => {
    const interval = setInterval(() => {
      api
        .get('/get_image')
        .then((res) => {
          const newData = res.data;

          // 如果新数据的 faceid 不等于 lastFaceId，则更新状态
          if (newData.faceid !== lastFaceId) {
            setFaces((prevFaces) => [...prevFaces, newData]);
            setLastFaceId(newData.faceid);
          }

          setData(newData);
          console.log(newData);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 200);
    return () => clearInterval(interval);
  }, [lastFaceId]);

  return (
    <div className="App">
      <h1>FeelXpert</h1>
      {data.message && <h2>{data.message}</h2>}
      <h2>All Faces Data:</h2>
      <ul>
        {faces.map((face, index) => (
          <div key={index}>
            <img
              src={mainurl + face.originaldatafile + token}
              alt="face"
              width="200"
              height="200"
            />
            <p>Face ID: {face.faceid}</p>
            <p style={{ fontSize: '20px' }}>
              Emotion: <strong>{face.emotion}</strong>
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
