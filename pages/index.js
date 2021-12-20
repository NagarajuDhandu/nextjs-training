import { useState } from "react";

import { Row, Col, Button } from "react-bootstrap";
import AuthorIntro from "./components/AuthorIntro";
import PageLayout from "./components/PageLayout";

import { getAllBlogs } from "../lib/api";
import { getPaginatedBlogs } from "../lib/api";
import FilteringMenu from "./components/FilteringMenu";


import { useGetBlogsPages } from "actions/pagination";
//import { useGetBlogs } from "actions";

export default function Home({ blogs}) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc:0 }
  });

 const {
   pages,
   isLoadingMore,
   isReachingEnd,
   loadMore
 } = useGetBlogsPages({blogs,filter});

  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => setFilter({ ...filter, [option]: value })
        }
      />
      <hr />
      <Row className="mb-5">
        {pages}
      </Row>
      <div style={{textAlign: 'center'}}>
      <Button 
      onClick={loadMore}
      disabled={isReachingEnd || isLoadingMore}
      size="lg" 
      variant="outline-secondary">
      {isLoadingMore ? '...' : isReachingEnd ? 'No More blogs' : 'More Blogs'}
      </Button>
      </div>
    </PageLayout>
  );
}

//Static Data
export async function getStaticProps() {
  const blogs = await getPaginatedBlogs();
  return {
    props: {
      blogs,
    },
  };
}

//Dyanamic Data
// export async function getServerSideProps() {
//   const randomNumber = Math.random();
//   const blogs = await getAllBlogs();
//   return {
//     props: {
//       blogs, randomNumber
//     }
//   }
// }
