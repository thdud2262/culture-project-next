"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { API_SortFunc, serviceKey } from "../../util/utils";
import styles from "../../cultureList/s_cultureList.module.css";
import { FaHeart, FaRegHeart, FaRegCalendarAlt } from "react-icons/fa";

export default function SearchList() {
  const params = useParams();
  const searchText = decodeURIComponent(params.text);
  const [resultList, setResulthList] = useState([]);

  const url = `http://openapi.seoul.go.kr:8088/${serviceKey}/json/culturalEventInfo/1/150/ /${searchText}`;

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        if (result.culturalEventInfo == undefined) {
          setResulthList(null);
          return;
        }
        const lists = result.culturalEventInfo.row;
        const listCopy = [...lists];
        const dataSortList = API_SortFunc(listCopy);
        setResulthList(dataSortList);
      });
  }, []);

  if (resultList == null) {
    return <div> 공연 정보가 없습니다 </div>;
  }

  return (
    <div>
      <div className={styles.listBox}>
        {resultList.map((li) => {
          const uniqueId = uuidv4();
          const today = new Date().toISOString().split("T")[0];
          const li_date = li.END_DATE.split(" ")[0];

          if(today > li_date) return

          return (
            <div key={uniqueId} className={styles.list}>
              <img src={li.MAIN_IMG} />
              <button className={styles.likeIcon}>
                {/* <FaHeart /> */}
                <FaRegHeart />
              </button>
              <div
                onClick={() => {
                  window.open(li.ORG_LINK, "_blank");
                }}
              >
                <p className={styles.codeName}>{li.CODENAME}</p>
                <p className={styles.date}>{li.DATE}</p>
                <p className={styles.title}>{li.TITLE}</p>
                <p className={styles.place}>
                  <span>공연 장소:</span> {li.PLACE}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
}
