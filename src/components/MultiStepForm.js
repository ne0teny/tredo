import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Alert,
  LinearProgress,
  Fade,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person,
  Badge,
  Home,
  Work,
  AttachMoney,
  CheckCircle,
  ArrowBack,
  ArrowForward,
  RestartAlt,
} from '@mui/icons-material';
import { useForm } from '../context/FormContext';
import AnimatedWrapper from './AnimatedWrapper';
import PersonalInfoStep from './steps/PersonalInfoStep';
import PassportInfoStep from './steps/PassportInfoStep';
import AddressInfoStep from './steps/AddressInfoStep';
import WorkInfoStep from './steps/WorkInfoStep';
import CreditInfoStep from './steps/CreditInfoStep';
import AgreementsStep from './steps/AgreementsStep';

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '&.Mui-active': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
      borderWidth: 3,
      transition: 'all 0.3s ease-in-out',
    },
  },
  '&.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.success.main,
      borderWidth: 3,
      background: `linear-gradient(90deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
    },
  },
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderRadius: 2,
    transition: 'all 0.3s ease-in-out',
  },
}));

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.text.disabled,
  display: 'flex',
  height: 32,
  width: 32,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `2px solid ${theme.palette.grey[300]}`,
  background: theme.palette.background.paper,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  ...(ownerState.active && {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    background: theme.palette.primary.light,
    transform: 'scale(1.1)',
    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
  }),
  ...(ownerState.completed && {
    color: theme.palette.success.contrastText,
    borderColor: theme.palette.success.main,
    background: theme.palette.success.main,
    transform: 'scale(1.05)',
    boxShadow: `0 3px 8px ${theme.palette.success.main}50`,
  }),
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
}));

function CustomStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <Person />,
    2: <Badge />,
    3: <Home />,
    4: <Work />,
    5: <AttachMoney />,
    6: <CheckCircle />,
  };

  return (
    <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckCircle /> : icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

const steps = [
  'Личные данные',
  'Документы',
  'Адрес',
  'Работа',
  'Кредит',
  'Подтверждение',
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ...(variant === 'contained' && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 20px ${theme.palette.primary.main}50`,
    },
  }),
  '&:disabled': {
    background: theme.palette.grey[200],
    color: theme.palette.grey[500],
  },
}));

const MultiStepForm = () => {
  const {
    currentStep,
    completedSteps,
    goToNextStep,
    goToPreviousStep,
    resetForm,
  } = useForm();

  const [slideDirection, setSlideDirection] = React.useState('left');

  const handleNext = () => {
    setSlideDirection('left');
    goToNextStep();
  };

  const handlePrevious = () => {
    setSlideDirection('right');
    goToPreviousStep();
  };

  const renderStepContent = (step) => {
    const components = {
      1: <PersonalInfoStep />,
      2: <PassportInfoStep />,
      3: <AddressInfoStep />,
      4: <WorkInfoStep />,
      5: <CreditInfoStep />,
      6: <AgreementsStep />,
    };
    
    return (
      <Slide direction={slideDirection} in={true} timeout={300} key={step}>
        <div>{components[step] || <div>Неизвестный шаг</div>}</div>
      </Slide>
    );
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <AnimatedWrapper>
      <StyledPaper elevation={0}>
        {/* Прогресс-бар */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(0,0,0,0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              },
            }}
          />
        </Box>

        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Fade in={true} timeout={800}>
            <Typography variant="h3" component="h1" sx={{ 
              mb: 2, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}>
              Заявка на кредит
            </Typography>
          </Fade>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Шаг {currentStep} из {steps.length} • {steps[currentStep - 1]}
          </Typography>
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ mb: 5 }}>
          <Stepper
            activeStep={currentStep - 1}
            connector={<CustomStepConnector />}
            alternativeLabel
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={completedSteps.includes(index + 1)}
                active={currentStep === index + 1}
              >
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      color: currentStep === index + 1 ? 'primary.main' : 'text.secondary',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        <Box sx={{ mb: 5, minHeight: 400 }}>
          <AnimatedWrapper delay={100}>
            {renderStepContent(currentStep)}
          </AnimatedWrapper>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
            gap: 2,
          }}
        >
          <StyledButton
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            startIcon={<ArrowBack />}
            sx={{ minWidth: 140 }}
          >
            Назад
          </StyledButton>

          <StyledButton
            variant="text"
            onClick={resetForm}
            color="error"
            startIcon={<RestartAlt />}
            sx={{ 
              mx: 2,
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.contrastText',
              },
            }}
          >
            Очистить
          </StyledButton>

          <StyledButton
            variant="contained"
            onClick={handleNext}
            disabled={currentStep === 6}
            endIcon={<ArrowForward />}
            sx={{ minWidth: 140 }}
          >
            {currentStep === 6 ? 'Завершить' : 'Далее'}
          </StyledButton>
        </Box>

        {/* Completion Message */}
        {currentStep === 6 && completedSteps.length === 5 && (
          <Fade in={true} timeout={1000}>
            <Alert 
              severity="success" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'success.light',
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                🎉 Поздравляем! Вы успешно заполнили все этапы заявки на кредит.
                Ваша заявка будет рассмотрена в течение 24 часов.
              </Typography>
            </Alert>
          </Fade>
        )}
      </StyledPaper>
    </AnimatedWrapper>
  );
};

export default MultiStepForm; 