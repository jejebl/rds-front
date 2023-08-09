import React from 'react'
import './Pools.css';
import {
  Link
} from "react-router-dom";

const Pools = () => {
  return (
    <div className='pools_container'>
      <div className='pool'>
        <Link to={'/poolPage/Pool 1'}>
        <p className='pools_name'>Pool 1</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei. No deserunt mediocritatem mel. Lorem ipsum dolor sit amet et delectus accommodare his</p>
        </Link>      
      </div>
      {/*
      <div className='pool'>
        <Link to={'/poolPage/Pool 2'}>
        <p className='pools_name'>Pool 2</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei. No deserunt mediocritatem mel. Lorem ipsum dolor sit amet et delectus accommodare his</p>
        </Link>      
      </div>
      <div className='pool'>
        <Link to={'/poolPage/Pool 3'}>
        <p className='pools_name'>Pool 3</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei. No deserunt mediocritatem mel. Lorem ipsum dolor sit amet et delectus accommodare his</p>
        </Link>      
      </div>
      <div className='pool'>
        <Link to={'/poolPage/Pool 4'}>
        <p className='pools_name'>Pool 4</p>
        <p className='pools_yield'>Yield 8%</p>
        <p className='pools_description'>Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei. No deserunt mediocritatem mel. Lorem ipsum dolor sit amet et delectus accommodare his</p>
        </Link>      
      </div>
      */}
      
    </div>
  )
}

export default Pools
