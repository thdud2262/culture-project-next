"use client";
import { useEffect, useState } from "react";
import styles from "./s_cultureList.module.css";
// util함수 import
import { serviceKey } from "../util/utils";
import { useMonthNavigation } from "../util/hooks/useMonthNavigator";
// component_import
import CultureListItem from "./components/CultureListItem";
import CultureMonth from "./components/CultureMonth";
import ListViewIcon from "./components/ListViewIcon";
import CodeNameBtn from "./components/CodeNameBtn";

export default function Page() {
  const todayDate = new Date();
  const { curDate, handlePrevMonth, handleNextMonth } =
    useMonthNavigation(todayDate);
  const [cultureList, setCultureList] = useState([])
  const [codename, setCodename] = useState(" ");
  const [pageStyle, setPageStyle] = useState("grid");

  const urlDate = `${curDate.year}-${String(curDate.month + 1).padStart(
    2,
    "0"
  )}`;

  useEffect(() => {
    fetch(`/api/data/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codename: codename,
        urlDate: urlDate,
        serviceKey: serviceKey,
        type: "cultureList",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setCultureList(result);
      });
  }, [urlDate, codename, pageStyle]);

  const handleSearchCodeName = (c) => {
    if (c == "전체") {
      setCodename(" ");
      return;
    }
    setCodename(c);
  };

  const handlePageStyle = (style) => {
    setPageStyle(style);
  };

  if (cultureList == null) {
    return (
      <CultureMonth
        curDate={curDate}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        text={cultureList == null ? "공연정보가 없습니다" : ""}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.cultureNav}>
          <CultureMonth
            curDate={curDate}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            text={cultureList == null ? "공연정보가 없습니다" : ""}
          />
          <ListViewIcon handlePageStyle={handlePageStyle} />
        </div>
        <CodeNameBtn handleSearchCodeName={handleSearchCodeName} />

        <div className={pageStyle == "grid" ? styles.gridBox : styles.listBox}>
        {cultureList.map((list, idx) => {
            return <CultureListItem key={idx} list={list} />;
          })}
        </div>
      </div>
    </div>
  )
}
