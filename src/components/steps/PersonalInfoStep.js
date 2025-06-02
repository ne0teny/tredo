import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMaskInput } from 'react-imask';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Alert,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Person, Phone, Email, Cake } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { personalInfoSchema } from '../../utils/validationSchemas';
import AnimatedWrapper from '../AnimatedWrapper';

// Custom masked input component for phone numbers
const PhoneMaskInput = React.forwardRef(function PhoneMaskInput(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+7 (000) 000 00 00"
      definitions={{
        '0': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const PersonalInfoStep = () => {
  const { formData, updateFormData } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useReactHookForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: formData.personalInfo || {},
    mode: 'onChange',
  });

  const watchedValues = watch();

  // Автоматически сохраняем данные при изменении
  React.useEffect(() => {
    updateFormData('personalInfo', watchedValues);
  }, [watchedValues, updateFormData]);

  return (
    <AnimatedWrapper>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
          Личные данные
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.25rem' },
          }}
        >
          Введите ваши личные данные точно как указано в удостоверении личности. Все поля, отмеченные *, обязательны для заполнения.
        </Alert>

        <form onSubmit={handleSubmit(() => {})}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('lastName')}
                fullWidth
                label="Фамилия *"
                placeholder="Алексеев"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
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
                {...register('firstName')}
                fullWidth
                label="Имя *"
                placeholder="Алексей"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
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
                {...register('middleName')}
                fullWidth
                label="Отчество"
                placeholder="Александрович"
                error={!!errors.middleName}
                helperText={errors.middleName?.message || 'Необязательное поле'}
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
                {...register('birthDate')}
                fullWidth
                label="Дата рождения *"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake color="action" />
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
                {...register('phone')}
                fullWidth
                label="Номер телефона *"
                placeholder="+7 (776) 531 16 00"
                error={!!errors.phone}
                helperText={errors.phone?.message || 'Формат: +7 (776) 531 16 00'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                  inputComponent: PhoneMaskInput,
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
                {...register('email')}
                fullWidth
                label="Email *"
                type="email"
                placeholder="aleksey@example.com"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
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
              <strong>Важная информация:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Все данные должны точно соответствовать вашему удостоверению личности<br/>
              • Номер телефона будет использован для SMS-уведомлений о статусе заявки<br/>
              • Email необходим для получения информации о решении по кредиту
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
                ✓ Все данные заполнены корректно
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

export default PersonalInfoStep; 