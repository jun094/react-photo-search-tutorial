# 사진 검색 어플리케이션


<br/>


## 개요
- API를 사용하여 '우주 사진' 관련 검색을 도와줌
- API : ```비공개```

<br/>

## 시작

1. ```npm install```
2. ```yarn start```

<br/>

## NPM 설치 목록

- CRA
- Yarn 
- Reactstrap 
- Bootstrap
- Sass 
- Styled-components 
- Axios 
- Material-ui
- React-router-dom 
- Qs (querystring parsing)

<br/><br/>


## 기능 설명

### 1. 검색어 실시간 처리

- #### 1.1 작동 순서

  + uesState를 활용한 Input value값 상태 저장
  + react-router-dom의 history 객체를 활용하여, 해당 value값을 query string에 포함하여 페이지 이동
  + useEffect를 활용하여, react-router-dom의 location값이 달라질 때마다 ```getDatas()``` 함수 호출


- #### 1.2 ```getDatas``` 함수
  + 해당함수는 비동기 처리를 위해 ```async``` 로 선언
  + 최초로 데이터를 호출하는 경우에는 ```mode=init-data```
  + 무한스크롤 기능에 의해 추가적인 데이터 호출 경우에는 ```mode=more-data```


- #### 1.3 ```getDatas``` 함수의 비동기 과정
  + context API를 활용하여 [```ItemContex.js```](https://github.com/jun094/react-photo-search-tutorial/blob/master/src/ItemsContext.js)의 Loading state를 true로 변경
  + try문 입장 : API처리, localStorage의 page number와 like 정보 처리, dispatch 처리
  + try문에서 하나라도 에러 발생 시, catch문 입장

<br/>

### 2. 사진 리스트
- 사진 데이터의 전역 상태관리를 위한 ```Context API```와 ```uesReducer``` 사용
- 사진 데이터에는 API 데이터 + like 유무 정보를 담음
- 리듀서와 context는 ```ItemContext.js``` 한 곳에서 모두 관리
- 사진리스트 정보는 ```CardLists.js``` 에서 map함수에 의해 순차적으로 추출됨

<br/>

### 3. 하트(좋아요) 기능

- #### 3.1 상태 관련
  + Drawer의 '하트'를 누른 카드 정보는 [```DrawerLists.js```](https://github.com/jun094/react-photo-search-tutorial/blob/master/src/componets/DrawerLists.js) 에서 map함수에 의해 순차적으로 추출됨
  + '하트' 정보는 전역상태를 참조함
  + 전역 상태의 '하트' 정보는 LocalStorage를 참조함
  + Drawer의 '좋아요'를 누른 카드 정보는 [```DrawerLists.js```](https://github.com/jun094/react-photo-search-tutorial/blob/master/src/componets/DrawerLists.js) 에서 map함수에 의해 순차적으로 추출됨

- #### 3.2 메소드 관련
  + ```/componets/Card.js``` 의 [```handleLike```](https://github.com/jun094/react-photo-search-tutorial/blob/master/src/componets/Card.js#L86) 함수에서 관리
  + '하트' 클릭시, 해당 카드 정보는 LocalStorage에 저장되며, 전역 상태를 ```isLike=true``` 로 최신화함. [(action = "UPDATE_LIKE")](https://github.com/jun094/react-photo-search-tutorial/blob/master/src/ItemsContext.js#L31)

<br/>


### 4. 무한스크롤 기능
- ```/componets/CardSection.js``` 의 [```handleInfinitScroll```](https://github.com/jun094/react-photo-search-tutorial/blob/master/src/componets/CardSection.js#L92) 함수
- scroll 값 계산을 통해 데이터를 append해줌.
- NASA API에서는 page당 100개의 item 제공 ( https://images-api.nasa.gov/search?q=galaxy&page=1 )
- page 값은 로컬스토리지에 저장 후, 맨 하단에 내려왔을 때마다 LocalStorage의 page값을 +1씩 더해줌


<br/>

## 디자인 시스템

- 페이지 관련 스타일은 필자가 익숙한 scss를 사용
- 컴퍼넌트 스타일은 재사용성을 고려하여, styled-componet를 사용 
