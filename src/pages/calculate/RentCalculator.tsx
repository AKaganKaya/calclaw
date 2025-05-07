import type { FC } from 'react';
import { useState } from 'react';

import { Button, Form, InputNumber, Typography, Card, DatePicker, List, message } from 'antd';
import { useLocale } from '@/locales';
import { calculateRentUpdates } from '@/utils/rentUpdate';
import dayjs from 'dayjs';

const RentCalculator: FC = () => {
  const { formatMessage } = useLocale();
  const [rentStartDate, setRentStartDate] = useState<string | null>(null);
  const [initialRent, setInitialRent] = useState<number | null>(null);
  const [rentUpdates, setRentUpdates] = useState<any[]>([]);

  const handleRentUpdate = async () => {
    if (!rentStartDate || !initialRent) {
      message.warning(
        formatMessage({
          id: 'app.rent.warning',
          defaultMessage: 'Lütfen kira başlangıç tarihi ve tutarını giriniz.',
        })
      );
      return;
    }
  
    const updates = await calculateRentUpdates(new Date(rentStartDate), initialRent);
    setRentUpdates(updates);
  };

  return (
    <div className="rent-calculator-page">
      <Typography.Title level={3}>
        {formatMessage({
          id: 'app.rent.title',
          defaultMessage: 'Rent Inflation Update',
        })}
      </Typography.Title>

      <Typography.Paragraph>
        {formatMessage({
          id: 'app.rent.description',
          defaultMessage: 'You can calculate your rent increases based on inflation.',
        })}
      </Typography.Paragraph>

      <Card>
        <Form layout="vertical">
          <Form.Item
            label={formatMessage({
              id: 'app.rent.startDate',
              defaultMessage: 'Rent Start Date (YYYY-MM)',
            })}
          >
            <DatePicker
              picker="month"
              style={{ width: '100%' }}
              format="YYYY-MM"
              value={rentStartDate ? dayjs(rentStartDate) : null}
              onChange={(date) => setRentStartDate(date ? date.format('YYYY-MM') : null)}
            />
          </Form.Item>

          <Form.Item
            label={formatMessage({
              id: 'app.rent.initialRent',
              defaultMessage: 'Initial Rent Amount (₺)',
            })}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              value={initialRent ?? undefined}
              onChange={(value) => setInitialRent(value ?? null)}
              placeholder={formatMessage({
                id: 'app.rent.initialRentPlaceholder',
                defaultMessage: 'Example: 10000',
              })}
            />
          </Form.Item>

          <Button type="primary" block onClick={handleRentUpdate}>
            {formatMessage({
              id: 'app.rent.calculate',
              defaultMessage: 'Calculate Rent Updates',
            })}
          </Button>
        </Form>
      </Card>

      {rentUpdates.length > 0 && (
        <Card style={{ marginTop: 24 }}>
          <Typography.Title level={5}>
            {formatMessage({
              id: 'app.rent.updateList',
              defaultMessage: 'Updated Rent List',
            })}
          </Typography.Title>
          <List
            dataSource={rentUpdates}
            renderItem={(item) => (
              <List.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>
                    {item.date} (%{item.rate})
                  </span>
                  <strong>
                    {item.rent.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </strong>
                </div>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default RentCalculator;
