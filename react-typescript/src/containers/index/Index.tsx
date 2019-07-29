import React from 'react';
import IndexContent from './component/LoginCom';
import Header from '../../components/header/Header'
import './Index.css';

const Index: React.FC = () => {
  return (
    <div className="index-wrapper">
      <div className='index-header-wrapper'>
        <Header />
      </div>
      <div className='index-content-wrapper'>
        <div className="index-content">
          <div className='index-content-form-wrapper'>
            <IndexContent />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Index;
