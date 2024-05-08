// PW 유효성 체크 함수
function validatePW(password) {
    // 최소 8자 이상, 영문 대소문자 및 숫자 포함
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}
export { validatePW };