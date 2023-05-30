import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@mantine/dates';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider >
      <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0 }}>
        <App />
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>,
)
