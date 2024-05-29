import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { fetchSchedule } from '../services/tvmazeService';

const theme = {
  backgroundColor: '#20232a',
  primaryColor: '#306d7d',
  secondaryColor: '#282c34',
  accentColor: '#4caf50',
  textColor: '#ffffff',
  cardBackgroundColor: '#282c34',
  cardShadowColor: 'rgba(0, 0, 0, 0.5)',
  hoverTransform: 'translateY(-5px)',
  transitionDuration: '0.3s',
  headerBackgroundColor: '#306d7d',
  footerBackgroundColor: '#306d7d',
  inputBackgroundColor: '#3a3f47',
  inputTextColor: '#ffffff',
  noImage: '#265764',
  fontFamily: "'Roboto', sans-serif",
};

const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';

const formatTime = (time) => {
  const [hour, minute] = time.split(':');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding: 30px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const ShowCard = styled.div`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${(props) => props.theme.cardShadowColor};
  overflow: hidden;
  transition: transform ${(props) => props.theme.transitionDuration} ease;
  cursor: pointer;

  &:hover {
    transform: ${(props) => props.theme.hoverTransform};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: ${(props) => (props.hasImage ? 'block' : 'none')};
`;

const Placeholder = styled.div`
  width: 100%;
  height: 400px;
  display: ${(props) => (props.hasImage ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.noImage};
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  text-align: center;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => props.theme.primaryColor};
  height: 54px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const Schedule = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
`;

const ShowButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.accentColor};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color ${(props) => props.theme.transitionDuration} ease;

  &:hover {
    background-color: darken(${(props) => props.theme.accentColor}, 10%);
  }
`;

const HomePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      const data = await fetchSchedule();
      if (data.length === 0) {
        setError('Failed to fetch schedule. Please try again later.');
      } else {
        setSchedule(data);
      }
    };

    getSchedule();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {schedule.map((show) => (
          <ShowCard key={show.id}>
            <Image
              src={show.show.image ? show.show.image.medium : placeholderImage}
              alt={show.show.name}
              hasImage={!!show.show.image}
            />
            <Placeholder hasImage={!!show.show.image}>
              {!show.show.image && show.show.name}
            </Placeholder>
            <Content>
              <Title>{show.show.name}</Title>
              {show.airdate && show.airtime && (
                <Schedule>
                  {formatDate(show.airdate)} - {formatTime(show.airtime)}
                </Schedule>
              )}
              <Link to={`/show/${show.show.id}`} state={{ show: show.show }}>
                <ShowButton>View Details</ShowButton>
              </Link>
            </Content>
          </ShowCard>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
