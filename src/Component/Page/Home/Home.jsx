import React from 'react';
import Banner from './Banner';
import TagSection from './TagSection';
import PostList from '../DashBoard/PostList';
import Pagination from '../../Share/Pagination';
import AnnouncementSection from '../DashBoard/AnnouncementSection';
import FAQSection from '../../Share/FAQSection';
import ReviewSection from '../../Share/ReviewSection';
import PromotionSection from '../../Share/PromotionSection';
import StatsSection from '../../Share/StatsSection';
import NewsletterSection from '../../Share/NewsletterSection';

const Home = () => {
    return (
        <div>
      
           <div className='h-screen'> <Banner></Banner></div>
            <AnnouncementSection></AnnouncementSection>
            <TagSection></TagSection>
          <section className="py-20">
    <PostList />
    <Pagination />
  </section>


  <ReviewSection />
  <FAQSection />

  
  <PromotionSection />
  <StatsSection />
  <NewsletterSection />
</div>
      
    );
};

export default Home;