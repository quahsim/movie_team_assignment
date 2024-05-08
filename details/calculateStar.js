// 별 아이콘의 갯수를 계산
function calculateStar(vote_average) {
    let resultStar = "";
    // 10점만점이므로 아이콘 10개를 생성한다.
    for (let i = 0; i < 10; i++) {
      // 이 때 i보다 vote_average가 낮다면 속이 빈 star를 출력한다.
      resultStar += vote_average < i ? `<i class="bi bi-star"></i>` :
        // vote_average에서 -1를 뺀 값과 i를 비교하여 star-fill과 star-half를 결정한다.
        vote_average - 1 < i ? `<i class="bi bi-star-half"></i>` : `<i class="bi bi-star-fill"></i>`;
    }
    return resultStar;
  }

export {calculateStar};