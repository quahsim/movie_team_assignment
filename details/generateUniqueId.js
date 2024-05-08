// 고유한 id 생성 함수
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // 랜덤 문자열 생성
}
export { generateUniqueId };