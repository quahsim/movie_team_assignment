import { validatePW } from "./validation.js";
import { generateUniqueId } from "./generateUniqueId.js";

export function handleFinishButton(movie) {
    const IDInput = document.getElementById('ID');
    const PWInput = document.getElementById('PW');
    const RVInput = document.getElementById('RV');
    const FinishBtn = document.getElementById('Finish');

    FinishBtn.addEventListener('click', function () {
        const IDValue = IDInput.value.trim();
        const PWValue = PWInput.value.trim();
        const RVValue = RVInput.value.trim();

        const reviewListContainer = document.getElementById('reviewList');

        if (IDValue === '' || PWValue === '' || RVValue === '') {
            alert('ID, PW, Review를 모두 입력하세요.');
            return;
        }

        let storedReview = JSON.parse(localStorage.getItem('Review')) || [];

        const isDuplicateID = storedReview.some(review => review.ID === IDValue);
        if (isDuplicateID) {
            alert('동일한 ID로는 1개밖에 리뷰를 남길 수 없습니다.');
            return;
        }

        if (!validatePW(PWValue)) {
            alert('PW는 최소 8자 이상이어야 하며, 영문 대소문자와 숫자를 포함해야 합니다.');
            return;
        }

        const newReview = {
            movieId: movie.id,
            content: RVValue,
            ID: IDValue,
            PWValue: PWValue,
            id: generateUniqueId()
        };

        storedReview.push(newReview);

        localStorage.setItem('Review', JSON.stringify(storedReview));

        alert('리뷰가 작성되었습니다.');

        IDInput.value = '';
        PWInput.value = '';
        RVInput.value = '';

        reviewListContainer.innerHTML = '';
        storedReview.forEach(review => {
            if (review.movieId === movie.id) {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('row');
                reviewElement.innerHTML = `
                        <div class="col">
                            <p class="review">${review.ID} : ${review.content}</p>
                        </div>
                        <div class="col">
                            <button type="button" class="mod btn-secondary" id="modify">modify</button>
                            <button type="button" class="rem btn-secondary" id="remove" data-review-id="${review.id}">delete</button>
                        </div>
                    `;
                reviewListContainer.appendChild(reviewElement);
            }
        });
    });
}