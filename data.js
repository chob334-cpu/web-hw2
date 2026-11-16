// ===== Part A: 10칸짜리 배열 4개 (내 영화 5편 → 박스오피스 1~5위) =====
const titles = [
  "쇼생크 탈출", "인터스텔라", "인셉션", "어바웃 타임", "라라랜드",
  "서울의 봄", "파묘", "범죄도시4", "인사이드 아웃 2", "베테랑2"
];

const ratings = [8.7, 8.4, 8.4, 7.9, 7.9, 9.1, 8.4, 7.6, 8.9, 7.8];
const years = [1994, 2014, 2010, 2013, 2016, 2023, 2024, 2024, 2024, 2024];
const audiences = [0, 0, 0, 0, 0, 13128419, 11914784, 11502779, 8799013, 7525339]; // 내 영화는 0, 박스오피스는 원 단위 숫자

// ===== Part B: 영화 객체 10건 (키 8개, Part A와 같은 순서) =====
const movies = [
  { title: "쇼생크 탈출", year: 1994, date: "1994-09-23", rating: 8.7, audience: 0, poster: "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg", type: "mine", rank: null },
  { title: "인터스텔라", year: 2014, date: "2014-11-06", rating: 8.4, audience: 0, poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", type: "mine", rank: null },
  { title: "인셉션", year: 2010, date: "2010-07-21", rating: 8.4, audience: 0, poster: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", type: "mine", rank: null },
  { title: "어바웃 타임", year: 2013, date: "2013-12-05", rating: 7.9, audience: 0, poster: "/iR6022C3hN9qI8Z1xX461P7D71t.jpg", type: "mine", rank: null },
  { title: "라라랜드", year: 2016, date: "2016-12-07", rating: 7.9, audience: 0, poster: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", type: "mine", rank: null },
  { title: "서울의 봄", year: 2023, date: "2023-11-22", rating: 9.1, audience: 13128419, poster: "/5137887.jpg", type: "boxoffice", rank: 1 },
  { title: "파묘", year: 2024, date: "2024-02-22", rating: 8.4, audience: 11914784, poster: "/8832912.jpg", type: "boxoffice", rank: 2 },
  { title: "범죄도시4", year: 2024, date: "2024-04-24", rating: 7.6, audience: 11502779, poster: "/2291823.jpg", type: "boxoffice", rank: 3 },
  { title: "인사이드 아웃 2", year: 2024, date: "2024-06-12", rating: 8.9, audience: 8799013, poster: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", type: "boxoffice", rank: 4 },
  { title: "베테랑2", year: 2024, date: "2024-09-13", rating: 7.8, audience: 7525339, poster: "/9918273.jpg", type: "boxoffice", rank: 5 }
];