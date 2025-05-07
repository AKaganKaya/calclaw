import type { FC } from 'react';
import { useState } from 'react';

import { Button, Form, InputNumber, Typography, Card, Space } from 'antd';
import { explainGrossSalaryCalculation, explainNetSalaryCalculation } from '@/utils/calculations';
import { useLocale } from '@/locales';

const SalaryCalculator: FC = () => {
  const { formatMessage } = useLocale();
  const [gross, setGross] = useState<number | undefined>(undefined);
  const [net, setNet] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string | null>(null);

  const handleGrossToNet = () => {
    if (!gross) return;
    const { explanation, net: calculatedNet } = explainNetSalaryCalculation(gross);
    setResult(
      `${explanation}\n\n${formatMessage({
        id: 'title.calculate.result',
        defaultMessage: 'Net Salary:',
      })} ${calculatedNet.toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      })}`
    );
    setNet(undefined);
  };

  const handleNetToGross = () => {
    if (!net) return;
    const { explanation, gross: calculatedGross } = explainGrossSalaryCalculation(net);
    setResult(
      `${explanation}\n\n${formatMessage({
        id: 'title.calculate.resultGross',
      })} ${calculatedGross.toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      })}`
    );
    setGross(undefined);
  };

  return (
    <div className="salary-calculator-page">
      <Typography.Title level={3}>
        {formatMessage({ id: 'title.calculate.salary', defaultMessage: 'Salary Calculator' })}
      </Typography.Title>

      <Typography.Paragraph>
        {formatMessage({
          id: 'title.calculate.description',
          defaultMessage:
            'You can convert between gross and net salary. Enter your salary below to calculate.',
        })}
      </Typography.Paragraph>

      <Card>
        <Form layout="vertical">
          <Form.Item
            label={formatMessage({
              id: 'title.calculate.grossSalary',
            })}
          >
            <InputNumber
              style={{ width: '100%' }}
              value={gross}
              min={0}
              onChange={(value) => setGross(value!)}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => Number(value?.replace(/,/g, ''))}
              placeholder={formatMessage({
                id: 'title.calculate.grossSalaryPlaceholder',
              })}
            />
          </Form.Item>
          <Button type="primary" block onClick={handleGrossToNet}>
            {formatMessage({
              id: 'title.calculate.convertToNet',
            })}
          </Button>

          <Form.Item
            style={{ marginTop: 24 }}
            label={formatMessage({
              id: 'title.calculate.netSalary',
            })}
          >
            <InputNumber
              style={{ width: '100%' }}
              value={gross}
              min={0}
              onChange={(value) => setGross(value!)}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => Number(value?.replace(/,/g, ''))}
              placeholder={formatMessage({
                id: 'title.calculate.netSalaryPlaceholder',
              })}
            />
          </Form.Item>
          <Button type="dashed" block onClick={handleNetToGross}>
            {formatMessage({
              id: 'title.calculate.convertToGross',
            })}
          </Button>
        </Form>
      </Card>

      {result && (
        <Card style={{ marginTop: 24 }}>
          <Typography.Paragraph>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
          </Typography.Paragraph>
        </Card>
      )}
    </div>
  );
};

export default SalaryCalculator;
