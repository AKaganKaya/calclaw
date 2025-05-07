import type { FC } from 'react';
import { useState } from 'react';

import { Button, Form, InputNumber, Typography, Card, DatePicker, List, Space, message } from 'antd';
import { useLocale } from '@/locales';
import { calculateInterest } from '@/utils/avans_faiz';
import dayjs from 'dayjs';

const InterestCalculator: FC = () => {
  const { formatMessage } = useLocale();
  const [principal, setPrincipal] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [interestResult, setInterestResult] = useState<string | null>(null);
  const [interestDetailList, setInterestDetailList] = useState<any[]>([]);

  const handleCalculateInterest = async () => {
    if (!startDate || !endDate || !principal) {
      message.warning(
        formatMessage({
          id: 'app.interest.warning',
          defaultMessage: 'Lütfen tüm alanları doldurun.',
        })
      );
      return;
    }

    const { totalInterest, interestDetails } = await calculateInterest(startDate, endDate, principal);
    setInterestResult(
      `${formatMessage({
        id: 'app.interest.totalInterest',
        defaultMessage: 'Toplam İşlenen Faiz:',
      })} ${parseFloat(totalInterest).toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      })}`
    );
    setInterestDetailList(interestDetails);
    setPrincipal(null);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="interest-calculator-page">
      <Typography.Title level={3}>
        {formatMessage({
          id: 'app.interest.title',
        })}
      </Typography.Title>

      <Typography.Paragraph>
        {formatMessage({
          id: 'app.interest.description',
        })}
      </Typography.Paragraph>

      <Card>
        <Form layout="vertical">
          <Form.Item
            label={formatMessage({
              id: 'app.interest.amount',
            })}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              value={principal ?? undefined}
              onChange={(value) => setPrincipal(value ?? null)}
              placeholder={formatMessage({
                id: 'app.interest.amountPlaceholder',
              })}
            />
          </Form.Item>

          <Form.Item
            label={formatMessage({
              id: 'app.interest.startDate',
              defaultMessage: 'Start Date',
            })}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              value={startDate ? dayjs(startDate) : null}
              onChange={(date) => setStartDate(date ? date.format('YYYY-MM-DD') : null)}
            />
          </Form.Item>

          <Form.Item
            label={formatMessage({
              id: 'app.interest.endDate',
            })}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              value={endDate ? dayjs(endDate) : null}
              onChange={(date) => setEndDate(date ? date.format('YYYY-MM-DD') : null)}
            />
          </Form.Item>

          <Button type="primary" block onClick={handleCalculateInterest}>
            {formatMessage({
              id: 'app.interest.calculate',
            })}
          </Button>
        </Form>
      </Card>

      {interestDetailList.length > 0 && (
        <Card style={{ marginTop: 24 }}>
          <Typography.Title level={5}>
            {formatMessage({
              id: 'app.interest.detailTitle',
            })}
          </Typography.Title>
          <List
            dataSource={interestDetailList}
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical">
                  <div>
                    {item.periodStart} - {item.periodEnd} ({item.diffDays} gün)
                  </div>
                  <div>
                    {item.rate}% ➔{' '}
                    {parseFloat(item.interest).toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    })}
                  </div>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      )}

      {interestResult && (
        <Card style={{ marginTop: 24 }}>
          <Typography.Title level={5}>{interestResult}</Typography.Title>
        </Card>
      )}
    </div>
  );
};

export default InterestCalculator;
