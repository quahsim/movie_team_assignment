import { calculateStar } from "./calculateStar.js";
import { handleFinishButton } from "./finish.js";
import { handleDeleteButtons } from "./delete.js";

document.addEventListener('DOMContentLoaded', function () {
    // 로컬 스토리지에 저장되어 있는 movie 가져오기
    const movie = JSON.parse(localStorage.getItem('movie'));

    let storedReview = JSON.parse(localStorage.getItem('Review')) || [];
  
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
                        <p class="card-text"><small class="text-body-secondary"> Rating : ${calculateStar(movie.vote_average)}
                            <br></br>${movie.vote_average}</small></p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary" id="back-button">Back</button>
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
            </div>`;
  
      // 리뷰 목록 컨테이너
      const reviewListContainer = document.getElementById('reviewList');
  
      // 이전에 저장된 리뷰들 출력
      // 로컬스토리지로부터 키가 Review인 값을 가져와서 JSON 형식으로 파싱함. null이나 undefined면 빈배열인 []를 사용함
      storedReview = JSON.parse(localStorage.getItem('Review')) || [];
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
                        <button type="button" class="mod btn-secondary" id="modify">mofify</button>
                        <button type="button" class="rem btn-secondary" id="remove" data-review-id="${review.id}">delete</button>
                    </div>
                `;
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
  
    // PW 입력 필드의 입력 이벤트 처리
    PWInput.addEventListener('input', function () {
      const PWValue = PWInput.value.trim();
      const inputValue = PWInput.value.trim();
      const length = inputValue.length;
  
      // // 입력된 값 대신 *로 표시
      // const maskedValue = '*'.repeat(length);
      // PWInput.value = maskedValue;
    });
  
    // 리뷰 작성 기능
    handleFinishButton(movie);

  
    // 삭제 버튼에 대한 클릭 이벤트 리스너 추가
    storedReview = JSON.parse(localStorage.getItem('Review')) || [];
    handleDeleteButtons(storedReview);
  });
  