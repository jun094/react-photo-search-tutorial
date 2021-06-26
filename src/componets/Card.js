import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import LoadingImg from './LoadingImg';

const CustomCard = styled.div`
    & .card {
        background: #ffffff;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
        border-radius: 4px;

        & .img-wrapper {
            position: relative;
            & svg {
                cursor: pointer;
                position: absolute;
                top: 11.75px;
                right: 12.26px;
            }
            & img {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                height: 111px;
            }
        }
    }

    & .card-body {
        padding: 8px 12px;

        // 한줄 자르기
        & h5,
        h6,
        p {
            width: 188px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        // 4줄 자르기
        & p {
            white-space: normal;
            line-height: 22px;
            height: 89px;
            text-align: left;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }

        & h5 {
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
        }
        & h6 {
            margin: 0 0 8px 0;
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #858899;
        }
        & p {
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
            letter-spacing: -0.1px;
            color: #2b2d36;
        }
    }
`;

function CardComponent({ data, img }) {
    const [url, setUrl] = useState(null); // 사진의 url
    const [isLoading, setIsLoading] = useState(true);
    const [like, setLike] = useState(false); //default는 like 안 누른 상태

    //text data 비구조할당
    const { center, date_created, description, media_type, nasa_id, title } = data;

    const getDatas = () => {
        Axios.get(img).then((res) => {
            for (let i = 0, n = res.data.length; i < n; i++) {
                if (res.data[i].indexOf('small') !== -1) setUrl(res.data[i]); //small size를 url로 선택
            }
            setIsLoading(false);
        });
    };
    useEffect(() => {
        getDatas();
    }, []);

    /* 메소드 정리 */
    // card like 버튼 클릭 메소드
    const handleLike = (click) => {
        console.log(click, nasa_id);
        if (click === 'like') {
            let tmp = JSON.parse(localStorage.getItem('nasa-like-2106261404'));

            if (tmp === null) tmp = []; //첫 like 클릭인 경우

            tmp.push({
                nasa_id: nasa_id,
                center: center,
                date_created: date_created,
                description: description,
                media_type: media_type,
                title: title,
            });

            localStorage.setItem('nasa-like-2106261404', JSON.stringify(tmp)); // 직렬화해서 localstorage에 저장
        } else if (click === 'none-like') {
            let tmp = JSON.parse(localStorage.getItem('nasa-like-2106261404'));

            tmp.splice(tmp.indexOf(nasa_id), 1);

            localStorage.setItem('nasa-like-2106261404', JSON.stringify(tmp)); // 직렬화해서 localstorage에 저장
        }

        setLike(!like);
    };

    return (
        <CustomCard>
            <Card>
                {isLoading && <LoadingImg />}
                {!isLoading && (
                    <div className="img-wrapper">
                        {!like && (
                            <svg
                                onClick={() => handleLike('like')}
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.31936 0.749405C4.02186 0.749405 2.72436 1.2444 1.73436 2.2344C-0.244137 4.21441 -0.244137 7.4244 1.73436 9.4044L2.82936 10.4979H2.82786L9.99786 17.6679L18.2569 9.4074C20.2369 7.4274 20.2369 4.2189 18.2569 2.2389C17.2669 1.2489 15.9709 0.753905 14.6719 0.753905C13.3759 0.753905 12.0784 1.2489 11.0884 2.2389L9.99786 3.3294L8.90436 2.2344C7.91286 1.2444 6.61686 0.749405 5.31936 0.749405ZM5.31936 2.7009C6.15186 2.7009 6.93636 3.0249 7.52436 3.6129L8.61936 4.7079L9.99786 6.0879L11.3764 4.7079L12.4669 3.6174C13.0564 3.0294 13.8394 2.7054 14.6719 2.7054C15.5059 2.7054 16.2889 3.0294 16.8784 3.6174C18.0949 4.8339 18.0949 6.8124 16.8784 8.03041L9.99786 14.9094L4.20786 9.1194L3.11286 8.0259C2.52486 7.4364 2.19936 6.6534 2.19936 5.8194C2.19936 4.9854 2.52486 4.2039 3.11286 3.6129C3.70236 3.0249 4.48536 2.7009 5.31936 2.7009Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                        {like && (
                            <svg
                                onClick={() => handleLike('none-like')}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M20.2571 5.23837C18.2771 3.25837 15.0686 3.25837 13.0886 5.23837L11.9981 6.32887L10.9046 5.23387C8.92461 3.25538 5.71461 3.25538 3.73461 5.23387C1.75611 7.21387 1.75611 10.4239 3.73461 12.4024L4.82961 13.4974L4.82811 13.4989L11.9981 20.6674L20.2571 12.4069C22.2371 10.4284 22.2371 7.21687 20.2571 5.23837Z"
                                    fill="#FA5F6E"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.31936 3.7494C6.02186 3.7494 4.72436 4.2444 3.73436 5.2344C1.75586 7.21441 1.75586 10.4244 3.73436 12.4044L4.82936 13.4979H4.82786L11.9979 20.6679L20.2569 12.4074C22.2369 10.4274 22.2369 7.2189 20.2569 5.2389C19.2669 4.2489 17.9709 3.7539 16.6719 3.7539C15.3759 3.7539 14.0784 4.2489 13.0884 5.2389L11.9979 6.3294L10.9044 5.2344C9.91286 4.2444 8.61686 3.7494 7.31936 3.7494ZM7.31936 5.7009C8.15186 5.7009 8.93636 6.0249 9.52436 6.6129L10.6194 7.7079L11.9979 9.0879L13.3764 7.7079L14.4669 6.6174C15.0564 6.0294 15.8394 5.7054 16.6719 5.7054C17.5059 5.7054 18.2889 6.0294 18.8784 6.6174C20.0949 7.8339 20.0949 9.8124 18.8784 11.0304L11.9979 17.9094L6.20786 12.1194L5.11286 11.0259C4.52486 10.4364 4.19936 9.6534 4.19936 8.8194C4.19936 7.9854 4.52486 7.2039 5.11286 6.6129C5.70236 6.0249 6.48536 5.7009 7.31936 5.7009Z"
                                    fill="#FA5F6E"
                                />
                            </svg>
                        )}

                        <CardImg top width="100%" src={url} alt="Card image cap" />
                    </div>
                )}
                <CardBody>
                    <CardTitle tag="h5">{title}</CardTitle>
                    <CardSubtitle tag="h6">{date_created}</CardSubtitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </CustomCard>
    );
}

export default CardComponent;

CardComponent.defaultProps = {
    data: {
        center: 'center-data...',
        date_created: '1969-07-21T00:00:00Z',
        description: 'description-data...',
        keywords: [],
        media_type: 'image',
        nasa_id: 'nasa-id...',
        title: 'title-data...',
    },
    img: 'https://images-assets.nasa.gov/image/iss010e12103/collection.json',
};
