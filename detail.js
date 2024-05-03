document.addEventListener('DOMContentLoaded', function () {
  // 로컬 스토리지에 저장되어 있는 movie 가져오기
  const movie = JSON.parse(localStorage.getItem('movie'));

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
                            <h1 class="card-title">${movie.title}</h1>
                            <br></br>
                            <p class="card-text">${movie.overview}</p>
                            <p class="card-text"><small class="text-body-secondary"> Rating : ${movie.vote_average}</small></p>
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
                    <div class="reviewed">
                        <p class="review">review review review review review review </p>
                        <div class="col">
                            <button type="button" class="mod btn-secondary" id="modify">mofify</button>
                            <button type="button" class="rem btn-secondary" id="remove">delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
  } else {
    console.error('영화 정보를 찾을 수 없습니다.');
  }

  // 돌아가기 버튼 기능
  const backBtn = document.getElementById("back-button");
  backBtn.addEventListener('click', () => {
    // 타이틀 페이지로 이동
    localStorage.removeItem('movie');
    window.location.href = 'index.html';
  });

  //리뷰 작성 기능
  const IDInput = document.getElementById('ID');
  const PWInput = document.getElementById('PW');
  const RVInput = document.getElementById('RV');
  const FinishBtn = document.getElementById('Finish');

  const reviewElement = document.querySelector('.review');

  // PW 유효성 체크 함수
  function validatePW(password) {
    // 최소 8자 이상, 영문 대소문자 및 숫자 포함
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  // PW 입력 필드의 입력 이벤트 처리
  PWInput.addEventListener('input', function () {
    const inputValue = PWInput.value.trim();
    const length = inputValue.length;

    // 입력된 값 대신 *로 표시
    const maskedValue = '*'.repeat(length);
    PWInput.value = maskedValue;
  });

  // Finish 버튼 클릭 시 저장
  FinishBtn.addEventListener('click', function () {
    const IDValue = IDInput.value.trim();
    const PWValue = PWInput.value.trim();
    const RVValue = RVInput.value.trim();

    // 입력값이 비어있는지 확인
    if (IDValue === '' || PWValue === '' || RVValue === '') {
      alert('ID, PW, Review를 모두 입력하세요.');
      return;
    }

    // PW 유효성 체크
    if (!validatePW(PWValue)) {
      alert('PW는 최소 8자 이상이어야 하며, 영문 대소문자와 숫자를 포함해야 합니다.');
      return;
    }

    // 로컬 스토리지에 저장
    localStorage.setItem('ID', IDValue);
    localStorage.setItem('PW', PWValue);
    localStorage.setItem('Review', RVValue);

    // 저장되었다는 메세지
    alert('리뷰가 작성되었습니다.');

    // 입력값 초기화
    IDInput.value = '';
    PWInput.value = '';
    RVInput.value = '';
  });

  // 페이지 로드 시 저장된 값 불러오기
  const storedID = localStorage.getItem('ID');
  const storedPW = localStorage.getItem('PW');
  const storedReview = localStorage.getItem('Review');

  // 저장된 값이 있다면 리뷰에 출력
  if (storedReview) {
    // RVInput.value = storedReview;
    reviewElement.textContent = storedReview;
  }
});