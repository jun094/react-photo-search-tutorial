import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background: black;
    border-radius: 50%;
`;

function CardComponent({ data, img }) {
    const [url, setUrl] = useState(null); // 사진의 url
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <Card>
            <CardImg top width="100%" src={url} alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {date_created}
                </CardSubtitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    );
}

export default CardComponent;
