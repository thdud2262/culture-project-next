import Link from "next/link";
import "./globals.css";
import styles from "./styles/page.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <Link href='/'>나도 문화인</Link>
          </div>
          <div className={styles.navbar}>
            <div className={styles.mainItemBox}>
              <Link href="/cultureList" className={styles.navItem}>
                <p>오늘의</p>
                <p>공연/전시</p>
              </Link>
              <Link href="/cultureCalendar" className={styles.navItem}>
                <p>전체 일정</p>
                <p>(달력)</p>
              </Link>
              <Link href="/cultureMap" className={styles.navItem}>
                <p>내 주변</p>
                <p>공연/전시장</p>
                {/* http://data.seoul.go.kr/dataList/OA-15487/S/1/datasetView.do */}
              </Link>
              <div>
                <input placeholder="공연 제목을 검색합니다"/>
                <button>검색</button>
              </div>
            </div>
            <div className={styles.loginBox}>
              <Link href={'/login'}>로그인</Link>
              <Link href={'/signup'}>회원가입</Link>
            </div>
          </div>
        </header>
        <div className={styles.contents}>{children}</div>
        {/* <footer className={styles.footer}>
          <div className={styles.footerBar}>
            <div className={styles.profile}>
              <img src={"image/ex1.jpg"} />
              <span>소영's 프로젝트</span>
            </div>
            <div className={styles.link}>
              <div>
                <img src={"image/git.jpg"} />
                <span>Github</span>
              </div>
              <div>
                <img src={"image/notion.jpg"} />
                <span>Notion</span>
              </div>
            </div>
          </div>
        </footer> */}
      </body>
    </html>
  );
}
