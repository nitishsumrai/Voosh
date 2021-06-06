import { useState, useEffect } from "react";
import axios from 'axios';

export const useAsync = (setSpinner) => {
  const [data, setData] = useState(null);
  const hook = () => {
    let isSubscribed = true;
    const fetchData = async () => {
      let resBody = await axios.get("http://3.137.205.68:8081/");
      resBody = resBody.data.list;
      if (isSubscribed) {
        if(!!setSpinner)
          setSpinner(false);
        setData(resBody);
      }
    };
    if(!!setSpinner)
      setSpinner(true);
    fetchData();
    return () => (isSubscribed = false);
  };
  useEffect(hook, []);

  return [data];
};
