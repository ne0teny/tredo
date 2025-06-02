import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Grid,
  Alert,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import { CheckCircle, Warning } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { agreementsSchema } from '../../utils/validationSchemas';

const AgreementsStep = () => {
  const { formData, updateFormData } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useReactHookForm({
    resolver: yupResolver(agreementsSchema),
    defaultValues: formData.agreements,
    mode: 'onChange',
  });

  const watchedValues = watch();

  // Автоматически сохраняем данные при изменении
  React.useEffect(() => {
    updateFormData('agreements', watchedValues);
  }, [watchedValues, updateFormData]);

  const handleSubmitApplication = () => {
    if (isValid) {
      // Здесь была бы отправка данных на сервер
      alert('Заявка успешно отправлена! Ваша заявка будет рассмотрена в течение 24 часов.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
        Согласия и подтверждение
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Ознакомьтесь с условиями и дайте необходимые согласия для завершения подачи заявки.
      </Alert>

      {/* Сводка заявки */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
          Сводка вашей заявки
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>ФИО:</strong> {formData.personalInfo.lastName} {formData.personalInfo.firstName} {formData.personalInfo.middleName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Телефон:</strong> {formData.personalInfo.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Email:</strong> {formData.personalInfo.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Дата рождения:</strong> {formData.personalInfo.birthDate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Сумма кредита:</strong> {formData.creditInfo.amount?.toLocaleString()} ₽
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Срок:</strong> {formData.creditInfo.term} месяцев
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Цель:</strong> {formData.creditInfo.purpose}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Ежемесячный доход:</strong> {formData.workInfo.monthlyIncome?.toLocaleString()} ₽
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <form onSubmit={handleSubmit(handleSubmitApplication)}>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('dataProcessing')}
                checked={watchedValues.dataProcessing}
              />
            }
            label={
              <Box>
                <Typography variant="body1">
                  Я даю согласие на обработку персональных данных *
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Банк будет использовать ваши данные только для рассмотрения заявки на кредит
                  и выполнения обязательств по договору
                </Typography>
              </Box>
            }
          />
          {errors.dataProcessing && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
              {errors.dataProcessing.message}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('creditConditions')}
                checked={watchedValues.creditConditions}
              />
            }
            label={
              <Box>
                <Typography variant="body1">
                  Я согласен с условиями кредитования *
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ознакомился с тарифами, процентными ставками и условиями предоставления кредита
                </Typography>
              </Box>
            }
          />
          {errors.creditConditions && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
              {errors.creditConditions.message}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('notifications')}
                checked={watchedValues.notifications}
              />
            }
            label={
              <Box>
                <Typography variant="body1">
                  Я согласен получать уведомления по SMS и email
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Получать информацию о статусе заявки и рекламные предложения банка
                </Typography>
              </Box>
            }
          />
        </Box>

        {/* Предупреждения */}
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
            Убедитесь, что все данные заполнены корректно. После подачи заявки изменение данных будет возможно только через службу поддержки.
          </Typography>
        </Alert>

        {/* Индикатор готовности */}
        <Box sx={{ mb: 3 }}>
          {isValid ? (
            <Alert severity="success">
              <Typography variant="body1">
                Все согласия получены. Заявка готова к отправке!
              </Typography>
            </Alert>
          ) : (
            <Alert severity="error">
              <Typography variant="body1">
                Для подачи заявки необходимо дать все обязательные согласия
              </Typography>
            </Alert>
          )}
        </Box>

        {/* Кнопка отправки */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isValid}
            sx={{
              minWidth: 200,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              },
            }}
          >
            Подать заявку на кредит
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AgreementsStep; 