export const pagination = document.querySelector('.pagination');

// 페이지네이션을 생성하고 추가하는 함수
export function renderPagination(totalPages, currentPageObj) {
    //const previousHtml = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
    //const nextHtml = `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;

    //pagination.insertAdjacentHTML("beforeend", previousHtml); //previous버튼

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = createPageLink(i);
        pagination.insertAdjacentHTML("beforeend", pageLink);
    }

    //pagination.insertAdjacentHTML("beforeend", nextHtml); //next버튼

    // 각 페이지 링크에 이벤트 리스너 추가
    const pageLinks = pagination.querySelectorAll('.page-item');
    pageLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // 선택된 페이지에 active 클래스 추가
            pageLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            currentPageObj.currentPage = event.target.textContent; //현재 페이지를 갱신한다.
            localStorage.removeItem('searchValue'); //검색 결과를 삭제한다. 
        });
    });
}

// 페이지 번호를 생성하는 함수
function createPageLink(pageNumber) {
    const pageHtml = `
  <li class="page-item"><a class="page-link" href="#">${pageNumber}</a></li>
  `;
    return pageHtml;
}