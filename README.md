# NASA 사진 검색 어플리케이션


<br/>

## NPM 설치 목록
- CRA
- yarn 
- Reactstrap 
- Bootstrap
- Sass 
- styled-components 
- Axios 
- material-ui
- react-router-dom 
- qs


## 기능 설명

#### 1. 사진 리스트
- 전역 상태관리를 위한 ```Context API```와 ```uesReducer``` 사용
- 리듀서와 context는 ```ItemContext.js``` 한 곳에서 모두 관리
- 사진리스트 정보는 ```CardLists.js``` 에서 map함수에 의해 순차적으로 추출됨

#### 2. 좋아요 기능
- ```/componets/Card.js``` 의 ```handleLike``` 함수
- Drawer의 '좋아요' 정보는 ```DrawerLists.js``` 에서 map함수에 의해 순차적으로 추출됨.
- 메인페이지의 '좋아요' 정보는 전역상태를 참조함.

- '좋아요' 클릭시, 해당 카드 정보는 localstorage 저장되며, 전역 상태를 ```isLike=true``` 로 최신화함.
- 두 곳에 모두 저장하는 이유는 사진리스트 정보는 전역상태(api)에 종속되며, 좋아요 정보는 localsotrage에 종속하기 위함.


#### 3. 무한스크롤 기능
- ```/componets/CardSection.js``` 의 ```handleInfinitScroll``` 함수
- scroll 값 계산을 통해 데이터를 append해줌.


#### 4. 검색 기능
- ```/componets/searchBtnGroup/SearchBtn.js``` :  select(전체,제목,설명) 검색 
- ```/componets/searchBtnGroup/Input.js``` :  input text 검색 

