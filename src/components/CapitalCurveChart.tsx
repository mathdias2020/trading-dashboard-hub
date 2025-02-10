
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CapitalPoint {
  date: string;
  value: number;
}

interface CapitalCurveChartProps {
  data: CapitalPoint[];
}

const CapitalCurveChart = ({ data }: CapitalCurveChartProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Curva de Capital</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis 
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`R$ ${value}`, 'Valor']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              fill="#93c5fd" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CapitalCurveChart;
