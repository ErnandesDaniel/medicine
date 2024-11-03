"use client"
import "./Header.css";
import {useRouter} from "next/navigation";
import {useCallback} from "react";
export default function Header() {

    const router = useRouter();

    const exit = useCallback(() => {
        router.push('/login');
    },[router]);

    return (

   <div className='header'>


       <div className='content'>

           <div className='siteTitle'>MedML</div>

           <div className='linkBlock'>

               <div className='link'>Добавить снимок</div>
               <div className='link'>Пациенты</div>
               <div className='link'>Почта</div>

           </div>

           <div className='outLink' onClick={exit}>Выйти</div>

       </div>


   </div>


    )
}

