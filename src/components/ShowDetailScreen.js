import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { fetchShowDetails } from '../services/tvmazeService';

const theme = {
  backgroundColor: '#20232a',
  primaryColor: '#61dafb',
  textColor: '#ffffff',
  cardBackgroundColor: '#282c34',
  cardShadowColor: 'rgba(0, 0, 0, 0.5)',
  hoverTransform: 'translateY(-5px)',
  transitionDuration: '0.3s',
  headerBackgroundColor: '#306d7d',
  footerBackgroundColor: '#306d7d',
  inputBackgroundColor: '#3a3f47',
  inputTextColor: '#ffffff',
  fontFamily: "'Roboto', sans-serif",
};

const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';

const formatTime = (time) => {
  const [hour, minute] = time.split(':');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  font-family: ${(props) => props.theme.fontFamily};
  padding: 20px;
`;

const ShowCard = styled.div`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 12px;
  box-shadow: 0 4px 8px ${(props) => props.theme.cardShadowColor};
  padding: 20px;
  max-width: 800px;
  width: 100%;
  transition: transform ${(props) => props.theme.transitionDuration} ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  color: #fff;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
`;

const ShowDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  object-fit: cover;
  display: ${(props) => (props.hasImage ? 'block' : 'none')};
`;

const Placeholder = styled.div`
  width: 100%;
  max-width: 400px;
  height: 450px;
  display: ${(props) => (props.hasImage ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 1rem;
  text-align: center;
`;

const Metadata = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MetadataLabel = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.primaryColor};
  margin-bottom: 0.5rem;
`;

const MetadataValue = styled.span`
  color: ${(props) => props.theme.textColor};
`;

const ShowDetailScreen = () => {
  const location = useLocation();
  const { show } = location.state || {};
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && show.id) {
      const getShowDetails = async () => {
        const data = await fetchShowDetails(show.id);
        if (!data) {
          setError('Failed to fetch show details. Please try again later.');
        } else {
          setShowDetails(data);
        }
      };

      getShowDetails();
    } else {
      setError('No show selected.');
    }
  }, [show]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ShowCard>
          <Header>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
            <Title>{showDetails.name}</Title>
          </Header>
          <ShowDetails>
            <Poster
              src={showDetails.image ? showDetails.image.original : placeholderImage}
              alt={showDetails.name}
              hasImage={!!showDetails.image}
            />
            <Placeholder hasImage={!!showDetails.image}>
              {!showDetails.image && showDetails.name}
            </Placeholder>
            <Description dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
            <Metadata>
              <MetadataItem>
                <MetadataLabel>Genres:</MetadataLabel>
                <MetadataValue>{showDetails.genres.join(', ')}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataLabel>Rating:</MetadataLabel>
                <MetadataValue>{showDetails.rating.average}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataLabel>Network:</MetadataLabel>
                <MetadataValue>{showDetails.network?.name}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataLabel>Schedule:</MetadataLabel>
                <MetadataValue>
                  {showDetails.schedule.days.join(', ')} at {formatTime(showDetails.schedule.time)}
                </MetadataValue>
              </MetadataItem>
            </Metadata>
          </ShowDetails>
        </ShowCard>
      </Container>
    </ThemeProvider>
  );
};

export default ShowDetailScreen;
