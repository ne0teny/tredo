import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Alert,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  InputAdornment,
} from '@mui/material';
import { AttachMoney, Schedule, Description, CreditCard } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { creditInfoSchema } from '../../utils/validationSchemas';
import AnimatedWrapper from '../AnimatedWrapper';

const CreditInfoStep = () => {
  const { formData, updateFormData } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useReactHookForm({
    resolver: yupResolver(creditInfoSchema),
    defaultValues: formData.creditInfo,
    mode: 'onChange',
  });

  const watchedValues = watch();
  const amount = watch('amount');
  const term = watch('term');
  const hasOtherCredits = watch('hasOtherCredits');

  // Автоматически сохраняем данные при изменении
  React.useEffect(() => {
    updateFormData('creditInfo', watchedValues);
  }, [watchedValues, updateFormData]);

  // Расчет примерного ежемесячного платежа
  const calculateMonthlyPayment = () => {
    if (!amount || !term) return 0;
    const monthlyRate = 0.15 / 12; // Примерная ставка 15% годовых
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                          (Math.pow(1 + monthlyRate, term) - 1);
    return Math.round(monthlyPayment);
  };

  const creditPurposes = [
    'Покупка автомобиля',
    'Покупка недвижимости',
    'Ремонт и обустройство',
    'Образование',
    'Лечение',
    'Развитие бизнеса',
    'Консолидация кредитов',
    'Личные нужды',
    'Другое'
  ];

  return (
    <AnimatedWrapper>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
          Параметры кредита
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.25rem' },
          }}
        >
          Укажите желаемые параметры кредита. Окончательные условия будут определены после рассмотрения заявки.
        </Alert>

        <form onSubmit={handleSubmit(() => {})}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('amount')}
                fullWidth
                label="Сумма кредита *"
                type="number"
                placeholder="2000000"
                inputProps={{ min: 500000, max: 100000000, step: 100000 }}
                error={!!errors.amount}
                helperText={errors.amount?.message || 'От 500,000 до 100,000,000 тенге'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">₸</InputAdornment>,
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
                {...register('term')}
                fullWidth
                label="Срок кредита *"
                type="number"
                placeholder="36"
                inputProps={{ min: 6, max: 360 }}
                error={!!errors.term}
                helperText={errors.term?.message || 'От 6 до 360 месяцев'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">мес.</InputAdornment>,
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
            
            <Grid item xs={12}>
              <TextField
                {...register('purpose')}
                select
                fullWidth
                label="Цель кредита *"
                error={!!errors.purpose}
                helperText={errors.purpose?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="action" />
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
              >
                {creditPurposes.map((purpose) => (
                  <MenuItem key={purpose} value={purpose}>
                    {purpose}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('hasOtherCredits')}
                    checked={hasOtherCredits || false}
                    onChange={(e) => setValue('hasOtherCredits', e.target.checked)}
                  />
                }
                label="У меня есть другие действующие кредиты"
              />
            </Grid>

            {hasOtherCredits && (
              <Grid item xs={12}>
                <TextField
                  {...register('otherCreditsInfo')}
                  fullWidth
                  label="Информация о других кредитах *"
                  placeholder="Укажите банк, сумма остатка, ежемесячный платеж"
                  multiline
                  rows={3}
                  error={!!errors.otherCreditsInfo}
                  helperText={errors.otherCreditsInfo?.message}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                        <CreditCard color="action" />
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
            )}
          </Grid>

          {/* Расчет платежа */}
          {amount && term && (
            <Paper 
              sx={{ 
                mt: 4, 
                p: 3, 
                bgcolor: 'primary.light', 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: 'primary.dark' }}>
                💰 Предварительный расчет
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Сумма кредита:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {Number(amount).toLocaleString()} ₸
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Ежемесячный платеж*:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ≈ {calculateMonthlyPayment().toLocaleString()} ₸
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                * Расчет примерный при ставке 15% годовых. Итоговая ставка определяется банком индивидуально.
              </Typography>
            </Paper>
          )}

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
              <strong>Важная информация:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Минимальная сумма кредита — 500,000 тенге<br/>
              • Максимальный срок кредитования — до 30 лет<br/>
              • Процентная ставка зависит от суммы, срока и вашей кредитной истории<br/>
              • Возможно досрочное погашение без комиссий
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
                ✓ Параметры кредита заполнены корректно
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

export default CreditInfoStep; 