import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledAnimatedBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${fadeInUp} 0.6s ease-out ${delay}ms both`,
  '& .MuiTextField-root': {
    animation: `${slideIn} 0.4s ease-out ${delay + 100}ms both`,
  },
  '& .MuiAlert-root': {
    animation: `${slideIn} 0.5s ease-out ${delay + 200}ms both`,
  },
}));

const AnimatedWrapper = ({ children, delay = 0 }) => {
  return (
    <StyledAnimatedBox delay={delay}>
      {children}
    </StyledAnimatedBox>
  );
};

export default AnimatedWrapper; 