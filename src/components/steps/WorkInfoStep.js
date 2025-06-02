import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Alert,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Business, Person, Timeline, AttachMoney, TrendingUp } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { workInfoSchema } from '../../utils/validationSchemas';
import AnimatedWrapper from '../AnimatedWrapper';

const WorkInfoStep = () => {
  const { formData, updateFormData } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useReactHookForm({
    resolver: yupResolver(workInfoSchema),
    defaultValues: formData.workInfo,
    mode: 'onChange',
  });

  const watchedValues = watch();

  // Автоматически сохраняем данные при изменении
  React.useEffect(() => {
    updateFormData('workInfo', watchedValues);
  }, [watchedValues, updateFormData]);

  return (
    <AnimatedWrapper>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
          Информация о трудовой деятельности
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.25rem' },
          }}
        >
          Укажите информацию о вашем текущем месте работы. Данные используются для оценки платежеспособности.
        </Alert>

        <form onSubmit={handleSubmit(() => {})}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register('company')}
                fullWidth
                label="Название организации *"
                placeholder="ТОО «Инновационные Технологии»"
                error={!!errors.company}
                helperText={errors.company?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('position')}
                fullWidth
                label="Должность *"
                placeholder="Старший разработчик"
                error={!!errors.position}
                helperText={errors.position?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('workExperience')}
                fullWidth
                label="Стаж работы *"
                type="number"
                placeholder="5"
                inputProps={{ min: 0, max: 50 }}
                error={!!errors.workExperience}
                helperText={errors.workExperience?.message || 'Полных лет'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Timeline color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('monthlyIncome')}
                fullWidth
                label="Ежемесячный доход *"
                type="number"
                placeholder="450000"
                inputProps={{ min: 50000, max: 50000000 }}
                error={!!errors.monthlyIncome}
                helperText={errors.monthlyIncome?.message || 'В тенге'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('additionalIncome')}
                fullWidth
                label="Дополнительный доход"
                type="number"
                placeholder="75000"
                inputProps={{ min: 0, max: 50000000 }}
                error={!!errors.additionalIncome}
                helperText={errors.additionalIncome?.message || 'В тенге (необязательно)'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TrendingUp color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Дополнительная информация */}
          <Paper 
            sx={{ 
              mt: 4, 
              p: 3, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>Рекомендации:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Указывайте официальный доход, подтвержденный справкой с места работы<br/>
              • Дополнительный доход может включать: фриланс, аренду, инвестиции<br/>
              • Все суммы указывайте в тенге до налогообложения
            </Typography>
          </Paper>

          {/* Индикатор валидности формы */}
          <Box sx={{ mt: 3 }}>
            {isValid ? (
              <Alert 
                severity="success"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: '1.25rem' },
                }}
              >
                ✓ Информация о работе заполнена корректно
              </Alert>
            ) : (
              <Alert 
                severity="warning"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: '1.25rem' },
                }}
              >
                Пожалуйста, заполните все обязательные поля корректно
              </Alert>
            )}
          </Box>
        </form>
      </Box>
    </AnimatedWrapper>
  );
};

export default WorkInfoStep; 