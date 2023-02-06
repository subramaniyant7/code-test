import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import axios from "axios";
import { ApiPath } from "../../api/apiPath";
import { AboutProps, AboutData } from "../../type";

const AboutUs: React.FC<AboutProps> = () => {
  const [data, setData] = useState<AboutData>({ info: "" });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(ApiPath.ABOUT_US)
      .then((res) => {
        if (res.data.success) {
          setData({ info: res.data.data });
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="about-us">{loading ? <Spin /> : <h2>{data?.info}</h2>}</div>
  );
};

export default AboutUs;
