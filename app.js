// Part A: 병렬 배열 + for / if 계산 (A1 ~ A5 콘솔 출력)
let sumRating = 0;
let sumAudience = 0;
let highRatingCount = 0;
let maxRatingIdx = 0;
let maxAudienceIdx = 0;
let count2024 = 0;

for (let i = 0; i < titles.length; i++) {
  sumRating += ratings[i];
  sumAudience += audiences[i];

  // 평점 8.5 이상 개수
  if (ratings[i] >= 8.5) {
    highRatingCount++;
  }

  // 최고 평점 영화 인덱스
  if (ratings[i] > ratings[maxRatingIdx]) {
    maxRatingIdx = i;
  }

  // 최다 관객수 영화 인덱스
  if (audiences[i] > audiences[maxAudienceIdx]) {
    maxAudienceIdx = i;
  }

  // 2024년 개봉작 개수
  if (years[i] === 2024) {
    count2024++;
  }
}

const avgRatingA = (sumRating / titles.length).toFixed(2);
const avgAudienceA = (sumAudience / titles.length).toFixed(1);

console.log("A1 (전체 편수 / 평균 평점):", `${titles.length}편 / ${avgRatingA}점`);
console.log("A2 (평점 8.5 이상 영화 수):", `${highRatingCount}편`);
console.log("A3 (최고 평점 영화):", `${titles[maxRatingIdx]} (${ratings[maxRatingIdx]}점)`);
console.log("A4 (최다 관객 영화):", `${titles[maxAudienceIdx]} (${audiences[maxAudienceIdx]}만 명)`);
console.log("A5 (2024년 개봉작 수 / 전체 평균 관객):", `${count2024}편 / ${avgAudienceA}만 명`);


// Part B: 객체 배열 + 함수 7개 + 화면 <pre id="out"> 3줄 요약

function getMovieCount(list) {
  return list.length;
}

function getAverageRating(list) {
  let sum = 0;
  for (const m of list) {
    sum += m.rating;
  }
  return Number((sum / list.length).toFixed(2));
}

function getTotalAudience(list) {
  let total = 0;
  for (const m of list) {
    total += m.audience;
  }
  return total;
}

function getTopRatedMovie(list) {
  let best = list[0];
  for (const m of list) {
    if (m.rating > best.rating) {
      best = m;
    }
  }
  return best;
}

function getMostWatchedMovie(list) {
  let top = list[0];
  for (const m of list) {
    if (m.audience > top.audience) {
      top = m;
    }
  }
  return top;
}

function filterMoviesByRating(list, minRating) {
  const result = [];
  for (const m of list) {
    if (m.rating >= minRating) {
      result.push(m);
    }
  }
  return result;
}

function formatMovieSummary(movie) {
  return `${movie.title}(${movie.year}, 평점 ${movie.rating}, 관객 ${movie.audience}만)`;
}

// 화면 <pre id="out">에 3줄 요약 출력
const outEl = document.getElementById("out");
const bestRated = getTopRatedMovie(movies);
const mostWatched = getMostWatchedMovie(movies);
const recommended = filterMoviesByRating(movies, 8.5);
const recommendedTitles = recommended.map((m) => m.title).join(", ");

const summaryLines = [
  `1. 전체 요약: 총 ${getMovieCount(movies)}편 | 평균 평점 ${getAverageRating(movies)}점 | 누적 관객 ${getTotalAudience(movies).toLocaleString()}만 명`,
  `2. 대표 흥행작: 최고 평점 [${formatMovieSummary(bestRated)}] / 최다 관객 [${formatMovieSummary(mostWatched)}]`,
  `3. 평점 8.5 이상 추천작 (${recommended.length}편): ${recommendedTitles}`
];

outEl.textContent = summaryLines.join("\n");


// Part C: 실제 TMDB 응답 데이터 처리 (함수 2개 + 콘솔 출력)

function analyzeTmdbStats(results) {
  let voteSum = 0;
  let popSum = 0;
  const langCount = {};

  for (const item of results) {
    voteSum += item.vote_average;
    popSum += item.popularity;
    const lang = item.original_language;
    langCount[lang] = (langCount[lang] || 0) + 1;
  }

  return {
    count: results.length,
    avgVote: Number((voteSum / results.length).toFixed(2)),
    avgPopularity: Number((popSum / results.length).toFixed(2)),
    langCount
  };
}

function getTopTmdbMovies(results, minVotes = 100, limit = 5) {
  return results
    .filter((item) => item.vote_count >= minVotes)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, limit)
    .map((item, idx) => ({
      순위: idx + 1,
      제목: item.title,
      개봉일: item.release_date,
      평점: item.vote_average,
      투표수: item.vote_count,
      인기도: Number(item.popularity.toFixed(1))
    }));
}

const tmdbResults = TMDB.results;
const tmdbStats = analyzeTmdbStats(tmdbResults);
const top5Tmdb = getTopTmdbMovies(tmdbResults, 100, 5);

console.log("C1 (TMDB 현재 상영작 수 / 집계 기간):", `${tmdbStats.count}편 (${TMDB.dates.minimum} ~ ${TMDB.dates.maximum})`);
console.log("C2 (TMDB 평균 평점 / 평균 인기도):", `${tmdbStats.avgVote}점 / ${tmdbStats.avgPopularity}`);
console.table(top5Tmdb);
console.log("C4 (원어별 작품 수 분포):", tmdbStats.langCount);

// [1번] 보너스용 함수 정의 (reduce 평균 + 요일 포함 날짜)
function getAverageRatingWithReduce(list) {
  if (list.length === 0) return 0;
  const sum = list.reduce((acc, movie) => acc + movie.rating, 0);
  return Number((sum / list.length).toFixed(2));
}

function getTmdbAverageVoteWithReduce(results) {
  if (results.length === 0) return 0;
  const sum = results.reduce((acc, item) => acc + item.vote_average, 0);
  return Number((sum / results.length).toFixed(2));
}

function formatDateWithDay(dateInput = new Date()) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  let dateObj;

  if (typeof dateInput === "string") {
    const [y, m, d] = dateInput.split("-").map(Number);
    dateObj = new Date(y, m - 1, d);
  } else {
    dateObj = dateInput;
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const dayOfWeek = days[dateObj.getDay()];

  return `${year}-${month}-${day} (${dayOfWeek})`;
}


// [2번] 보너스 실행 코드 (콘솔 출력 + 화면 기준일 추가 + fetch)
const reduceMovieAvg = getAverageRatingWithReduce(movies);
const reduceTmdbAvg = getTmdbAverageVoteWithReduce(tmdbResults);

console.log("=== [보너스] reduce() 평균 계산 ===");
console.log("movies 평균 평점 (reduce):", `${reduceMovieAvg}점`);
console.log("TMDB 평균 평점 (reduce):", `${reduceTmdbAvg}점`);

const todayWithDay = formatDateWithDay();
const tmdbMinWithDay = formatDateWithDay(TMDB.dates.minimum);
const tmdbMaxWithDay = formatDateWithDay(TMDB.dates.maximum);

console.log("=== [보너스] 요일 포함 날짜 출력 ===");
console.log("기준일:", todayWithDay);
console.log("TMDB 집계 기간:", `${tmdbMinWithDay} ~ ${tmdbMaxWithDay}`);

// 화면 <pre id="out"> 3줄 요약 아래에 기준일 추가
outEl.textContent += `\n기준일: ${todayWithDay}`;
// loadJson : tmdb.json 파일 ⇒ 콘솔에 평점 상위 5편 표(13주차 fetch 미리 보기)
function getList(data) {
  return data.results || [];
}

function sortBy(list, key, desc = false) {
  return [...list].sort((a, b) => (desc ? b[key] - a[key] : a[key] - b[key]));
}

async function loadJson() {
  const res = await fetch("tmdb.json");
  const data = await res.json();
  console.table(sortBy(getList(data), "vote_average", true).slice(0, 5), ["title", "vote_average"]);
}
loadJson();