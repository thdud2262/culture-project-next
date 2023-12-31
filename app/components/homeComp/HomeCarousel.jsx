"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./s_home.module.css";

// util/hooks import
import useHomeDateFetch from "../../util/hooks/useHomeDataFetch";

// ICON import
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

export default function HomeCarousel() {
  // Carousel - API데이터 요청
  const type = "carousel";
  const fetchDataList = useHomeDateFetch(type);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // Auto-play
  useEffect(() => {
    let intervalId = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((currentSlide) =>
          currentSlide === fetchDataList.length - 1 ? 0 : currentSlide + 1
        );
      }, 2500);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, fetchDataList.length]);

  const handlePrevBtn = () => {
    setCurrentSlide(
      currentSlide === 0 ? fetchDataList.length - 1 : currentSlide - 1
    );
  };
  const handleNextBtn = () => {
    setCurrentSlide(
      currentSlide === fetchDataList.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <>
      {fetchDataList?.map((i, idx) => {
        return (
          <div
            key={idx}
            className={styles.mainImgBox}
            style={{ display: idx === currentSlide ? "block" : "none" }}
          >
            <p className={styles.mainSubText}>
              D-day <br /> 20일 공연 LIST
            </p>
            <button
              className={styles.autoPlayBtn}
              onClick={() => {
                setIsPlaying((isPlaying) => !isPlaying);
              }}
            >
              {isPlaying ? <GiPauseButton /> : <FaPlay />}
            </button>
            <img src={i.MAIN_IMG} alt={i.PROGRAM} width={300} height={400} />
            <div className={styles.mainText}>
              <div>
                <p>{i.TITLE}</p>
                <p>{i.PLACE}</p>
                <p>{i.DATE}</p>
                <Link href={i.ORG_LINK} target="_blank">
                  자세히 보기
                </Link>
              </div>
            </div>
            <button className={styles.leftBtn} onClick={handlePrevBtn}>
              <FiChevronLeft />
            </button>
            <button className={styles.rightBtn} onClick={handleNextBtn}>
              <FiChevronRight />
            </button>
          </div>
        );
      })}
    </>
  );
}
