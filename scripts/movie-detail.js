document.addEventListener('DOMContentLoaded', function () {
  // 로컬 스토리지에 저장되어 있는 movie 가져오기
  const movie = JSON.parse(localStorage.getItem('movie'));

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

  // 영화 정보가 로컬 스토리지에 저장되어 있는지 확인
  if (movie) {
    const movieDetailContainer = document.getElementById('movie-detail');
    movieDetailContainer.innerHTML = `
          <div class="card mb-3" style="max-width: 100%;" id="${movie.id}">
              <div class="movie-info row g-0">
                  <div class="col-md-4">
                      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                      <h5 class="card-title">${movie.title}</h5>
                      <p class="card-text">${movie.overview}</p>
                      <div class ="ratings">
                        <p class="calculate-star"><small class="text-body-secondary"> Rating : ${calculateStar(movie.vote_average)}
                        <p class="vote-average"> ${movie.vote_average}</small></p>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div class="movie-review">
                    <div class="login">
                        <div class="IP">
                            <p class="prevID">ID : </p>
                            <input type="text" class="ID col" id="ID" placeholder=" ID...">
                            <p class="prevPW">PW : </p>
                            <input type="text" class="PW col" id="PW" placeholder=" PASSWORD...">
                        </div>
                        <input type="text" class="RV" id="RV">
                        <button type="button" class="btn btn-secondary" id="Finish">Finish</button>
                    </div>
                    <div id="reviewList" class="reviewed">
                        <!-- 리뷰들이 여기에 동적으로 추가됩니다 -->
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" id="back-button">Back</button>
            </div>`;

    // 리뷰 목록 컨테이너
    const reviewListContainer = document.getElementById('reviewList');

    // 이전에 저장된 리뷰들 출력
    // 로컬스토리지로부터 키가 Review인 값을 가져와서 JSON 형식으로 파싱함. null이나 undefined면 빈배열인 []를 사용함
    let storedReview = JSON.parse(localStorage.getItem('Review')) || [];
    console.log(storedReview);
    storedReview.forEach(review => {
      if (review.movieId === movie.id) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('row');
        reviewElement.innerHTML = `
                  <div class="col">
                      <p class="reviewID">${review.ID} : </p>
                      <p class="review">${review.content}</p>
                  </div>
                  <div class="col">
                      <button type="button" class="mod btn-secondary" id="modify">modify</button>
                      <button type="button" class="rem btn-secondary" id="remove" data-review-id="${review.id}">delete</button>
                  </div>
              `;
        reviewElement.style.marginBottom = '20px';

        reviewListContainer.appendChild(reviewElement);
      }
    });

  } else {
    console.error('영화 정보를 찾을 수 없습니다.');
  }

  storedReview = JSON.parse(localStorage.getItem('Review')) || [];

  //돌아가기 버튼 기능
  const backBtn = document.getElementById("back-button");
  backBtn.addEventListener('click', () => {
    // 상세 페이지로 왔다는 것을 표시
    localStorage.setItem('fromIndex', 'true');
    // 타이틀 페이지로 이동
    window.location.href = 'index.html';
  });

  //html창이 종료될 때 
  window.addEventListener('unload', function () {
    localStorage.removeItem('movie'); //상세정보를 가져오기위해 생성한 movie를 삭제함
  });

  //리뷰 작성 기능
  const IDInput = document.getElementById('ID');
  const PWInput = document.getElementById('PW');
  const RVInput = document.getElementById('RV');
  const FinishBtn = document.getElementById('Finish');

  // PW 유효성 체크 함수
  function validatePW(password) {
    // 최소 8자 이상, 영문 대소문자 및 숫자 포함
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  // PW 입력 필드의 입력 이벤트 처리
  PWInput.addEventListener('input', function () {
    const PWValue = PWInput.value.trim();
    const inputValue = PWInput.value.trim();
    const length = inputValue.length;

    // // 입력된 값 대신 *로 표시
    // const maskedValue = '*'.repeat(length);
    // PWInput.value = maskedValue;
  });

  // Finish 버튼 클릭 시 저장
  FinishBtn.addEventListener('click', function () {
    const IDValue = IDInput.value.trim();
    const PWValue = PWInput.value.trim();
    const RVValue = RVInput.value.trim();

    // 리뷰 목록 컨테이너
    // reviewListContainer를 정의해줌으로써 Finish 버튼을 누를때 reviewListContainer.innerHTML = ''; 명령어에서
    // undefined 되는 문제를 해결

    const reviewListContainer = document.getElementById('reviewList');

    // 입력값이 비어있는지 확인
    if (IDValue === '' || PWValue === '' || RVValue === '') {
      alert('ID, PW, Review를 모두 입력하세요.');
      return;
    }

    // 이전에 저장된 리뷰 가져오기
    let storedReview = JSON.parse(localStorage.getItem('Review')) || [];

    // ID 중복 체크
    const isDuplicateID = storedReview.some(review => review.ID === IDValue);
    if (isDuplicateID) {
      alert('동일한 ID로는 1개밖에 리뷰를 남길 수 없습니다.');
      return;
    }

    // PW 유효성 체크
    if (!validatePW(PWValue)) { // inputValue
      alert('PW는 최소 8자 이상이어야 하며, 영문 대소문자와 숫자를 포함해야 합니다.');
      return;
    }

    // 새로운 리뷰 객체 생성
    const newReview = {
      movieId: movie.id,
      content: RVValue,
      ID: IDValue,
      PWValue: PWValue,
      id: generateUniqueId() // 고유한 id 생성
    };

    // 새로운 리뷰를 배열에 추가
    storedReview.push(newReview);

    // 로컬 스토리지에 저장
    localStorage.setItem('Review', JSON.stringify(storedReview));

    // 저장되었다는 메세지
    alert('리뷰가 작성되었습니다.');

    // 입력값 초기화
    IDInput.value = '';
    PWInput.value = '';
    RVInput.value = '';

    // 리뷰 영역에 모든 저장된 리뷰 출력
    reviewListContainer.innerHTML = ''; // 기존 리뷰 초기화
    storedReview.forEach(review => {
      if (review.movieId === movie.id) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('row');
        reviewElement.innerHTML = `
                  <div class="col">
                      <p class="reviewID">${review.ID} : </p>
                      <p class="review">${review.content}</p>
                  </div>
                  <div class="col">
                      <button type="button" class="mod btn-secondary" id="modify">modify</button>
                      <button type="button" class="rem btn-secondary" id="remove" data-review-id="${review.id}">delete</button>
                  </div>
              `;
        reviewListContainer.appendChild(reviewElement);
      }
    });

    // // 삭제 버튼에 대한 클릭 이벤트 리스너 추가
    // const deleteButtons = document.querySelectorAll('.rem');
    // deleteButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //     const reviewId = button.getAttribute('data-review-id');
    //     // 리뷰 객체 가져오기
    //     const review = storedReview.find(review => review.id === reviewId);
    //     // 비밀번호 확인
    //     const inputPassword = prompt('리뷰를 삭제하려면 비밀번호를 입력하세요:');
    //     if (inputPassword === review.PWValue) {
    //         alert('리뷰가 성공적으로 삭제됐습니다.');
    //         // 저장된 리뷰에서 해당 ID를 가진 리뷰를 찾아서 제거
    //         storedReview = storedReview.filter(review => review.id !== reviewId);
    //         // 변경된 리뷰 목록을 로컬 스토리지에 다시 저장
    //         localStorage.setItem('Review', JSON.stringify(storedReview));
    //         // 변경된 내용을 화면에서도 반영하기 위해 해당 리뷰 요소 제거
    //         button.parentElement.parentElement.remove();
    //     } else {
    //         alert('ID, 비밀번호가 틀렸습니다.');
    //         return;
    //     }
    //   });
    // });
  });
  // 고유한 id 생성 함수
  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // 랜덤 문자열 생성
  }

  // 삭제 버튼에 대한 클릭 이벤트 리스너 추가
  const deleteButtons = document.querySelectorAll('.rem');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const reviewId = button.getAttribute('data-review-id');
      // 리뷰 객체 가져오기
      const review = storedReview.find(review => review.id === reviewId);
      // 비밀번호 확인
      const inputPassword = prompt('리뷰를 삭제하려면 비밀번호를 입력하세요:');
      if (inputPassword === review.PWValue) {
        alert('리뷰가 성공적으로 삭제됐습니다.');
        // 저장된 리뷰에서 해당 ID를 가진 리뷰를 찾아서 제거
        storedReview = storedReview.filter(review => review.id !== reviewId);
        // 변경된 리뷰 목록을 로컬 스토리지에 다시 저장
        localStorage.setItem('Review', JSON.stringify(storedReview));
        // 변경된 내용을 화면에서도 반영하기 위해 해당 리뷰 요소 제거
        button.parentElement.parentElement.remove();
      } else {
        alert('ID, 비밀번호가 틀렸습니다.');
        return;
      }
    });
  });
});
