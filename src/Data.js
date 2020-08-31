import React, { useState, useEffect } from 'react';
import { fetchData } from './db';

export default function Data({ x }) {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState({});

  useEffect(() => {
    fetchData('lift').then(setData);
  }, []);

  useEffect(() => {
    const k = {};
    data.map(item => Object.keys(item).map(key => k[key] = true));
    setKeys(k);
  }, [data]);

  let csv = `"${Object.keys(keys).join('","')}"\n`;
  data.map(item => {
    const row = [];
    Object.keys(keys).map(key => {
      row.push(item[key]);
    });
    csv += `"${row.join('","')}"\n`;
  })

  return (
    <textarea style={{fontSize: '6px', height: '99vh', width: '99vw'}} value={csv} />
  )
}
