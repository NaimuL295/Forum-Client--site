import React from 'react';
import Banner from './Banner';
import TagSection from './TagSection';
import PostList from '../DashBoard/PostList';
import Pagination from '../../Share/Pagination';
import AnnouncementSection from '../DashBoard/AnnouncementSection';
import FAQSection from '../../Share/FAQSection';

const Home = () => {
    return (
        <div>
      
           <div className='h-screen'> <Banner></Banner></div>
            <AnnouncementSection></AnnouncementSection>
            <TagSection></TagSection>
             <PostList />
      <Pagination />
        {/* <ReviewSection /> */}

    <FAQSection /> 
        </div>
    );
};

export default Home;