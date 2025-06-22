import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartGraph({ graphData }) {
  const [age, setAge] = useState('status');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (graphData && graphData[age]) {
      setData(graphData[age]);
    }
  }, [age, graphData]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='mt-3 md:mt-8 bg-white p-3 md:p-4 rounded-xl shadow-md w-full md:w-1/3'>
      <div className="!p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg mb-2 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-md sm:text-xl md:text-2xl font-bold flex items-center gap-2 hover:text-blue-700">
            Tickets
          </h2>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Tickets by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Tickets"
              onChange={handleChange}
            >
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='w-full h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}