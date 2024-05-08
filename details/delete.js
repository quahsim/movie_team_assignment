function handleDeleteButtons(storedReview) {
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
}

// 함수를 외부에서 사용할 수 있도록 export
// window.handleDeleteButtons = handleDeleteButtons;
export { handleDeleteButtons };