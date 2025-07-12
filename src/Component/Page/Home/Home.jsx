import React from 'react';
import Banner from './Banner';
import TagSection from './TagSection';
import PostList from '../DashBoard/PostList';
import Pagination from '../../Share/Pagination';

const Home = () => {
    return (
        <div>
      
            <Banner></Banner>
            <TagSection></TagSection>
             <PostList />
      <Pagination />
        </div>
    );
};

export default Home;