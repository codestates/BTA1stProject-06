// 액션 타입
const MOVE = 'page/MOVE';

// 액션 생성 함수
export const pageMove = (pageName) => ({ type: MOVE, page: pageName });

// 상태
const initialState = {
    page: 'start'
}

// 리듀서
export default function setPage(state = initialState, action){
    switch (action.type){
        case MOVE:
            return {
                ...state,
                page: action.page
            }
        default:
            return state;
    }
}