import type { Metadata } from "next";
import "./reset.css";


import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';


export const metadata: Metadata = {
  title: "Виртуальный ассистент",
};

export default function RootLayout({ children }: React.PropsWithChildren){
  return (
    <html lang="ru">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
