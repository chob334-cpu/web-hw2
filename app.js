// ===== Part A =====
let sumA = 0;
let maxA = 0;
let count8A = 0;
let y2020A = 0;
let y2010A = 0;
let y2000A = 0;
let yOldA = 0;
let bigA = "";

for (let i = 0; i < titles.length; i++) {
  sumA += ratings[i];

  if (ratings[i] > ratings[maxA]) {
    maxA = i;
  }

  if (ratings[i] >= 8) {
    count8A++;
  }

  const decade = years[i] - (years[i] % 10);
  switch (decade) {
    case 2020:
      y2020A++;
      break;
    case 2010:
      y2010A++;
      break;
    case 2000:
      y2000A++;
      break;
    default:
      yOldA++;
      break;
  }

  if (audiences[i] >= 1000000) {
    bigA += (bigA === "" ? "" : " ") + titles[i];
  }
}

if (bigA === "") {
  bigA = "없음";
}

console.log("A1 평균 평점:", sumA / titles.length);
console.log("A2 최고 평점:", titles[maxA], ratings[maxA]);
console.log("A3 8점 이상:", `${count8A}편`);
console.log(`A4 2020년대 ${y2020A}편, 2010년대 ${y2010A}편, 2000년대 ${y2000A}편, 그 이전 ${yOldA}편`);
console.log("A5 관객 100만 이상:", bigA);


// ===== Part B =====

function average(list) {
  return averageBy(list, "rating");
}

function best(list) {
  let topMovie = list[0];
  for (const m of list) {
    if (m.rating > topMovie.rating) {
      topMovie = m;
    }
  }
  return topMovie;
}

function filterByRating(list, min) {
  return list.filter((m) => m.rating >= min);
}

function sortBy(list, key, desc) {
  const sign = desc ? -1 : 1;
  return [...list].sort((a, b) => {
    if (typeof a[key] === "string") {
      return a[key].localeCompare(b[key]) * sign;
    }
    return (a[key] - b[key]) * sign;
  });
}

function search(list, keyword) {
  const clean = keyword.trim().toLowerCase();
  return list.filter((m) => m.title.toLowerCase().includes(clean));
}

function formatNumber(n) {
  return Number(n).toLocaleString("ko-KR");
}

function yearsSince(dateStr) {
  const thisYear = new Date().getFullYear();
  const releaseYear = new Date(dateStr).getFullYear();
  return thisYear - releaseYear;
}

const bestMovie = best(movies);
const topAudienceMovie = sortBy(movies, "audience", true)[0];

const line1 = `전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점`;
const line2 = `최고 평점 ${bestMovie.title} (${bestMovie.rating}점, 개봉한 지 ${yearsSince(bestMovie.date)}년)`;
const line3 = `관객 1위 ${topAudienceMovie.title} (누적 ${formatNumber(topAudienceMovie.audience)}명)`;

document.getElementById("out").textContent = `${line1}\n${line2}\n${line3}`;


// ===== Part C =====

function getList(data) {
  return data.results;
}

function averageBy(list, key) {
  const sum = list.reduce((acc, m) => acc + m[key], 0);
  return sum / list.length;
}

const tmdbList = getList(TMDB);

console.log(`C1 페이지 ${TMDB.page}/${TMDB.total_pages}, 전체 ${TMDB.total_results}편, 현재 응답 ${tmdbList.length}편`);
console.log("C2 상영작 평균 평점:", averageBy(tmdbList, "vote_average").toFixed(1));
console.table(sortBy(tmdbList, "vote_average", true).slice(0, 5), ["title", "release_date", "vote_average"]);
console.log('C4 "the" 검색 결과:', `${search(tmdbList, "the").length}편`);


// ===== Step 5 보너스 =====

// formatDate : "2014-11-06" ⇒ "2014년 11월 6일 (목)"
function formatDate(dateStr) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  return `${y}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 (${days[dateObj.getDay()]})`;
}

console.log("보너스 날짜 테스트:", formatDate("2014-11-06"));

// loadJson : tmdb.json 파일 ⇒ 콘솔에 평점 상위 5편 표
async function loadJson() {
  const res = await fetch("tmdb.json");
  const data = await res.json();
  console.table(sortBy(getList(data), "vote_average", true).slice(0, 5), ["title", "vote_average"]);
}
loadJson();