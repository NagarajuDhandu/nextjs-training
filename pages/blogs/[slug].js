import PageLayout from "../components/PageLayout";
import BlogHeader from "pages/components/BlogHeader";
import { getBlogBySlug } from "../../lib/api";
import { getAllBlogs } from "../../lib/api";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import BlogContent from "pages/components/BlogContent";
import moment from "moment";
import ErrorPage from "next/error";

const BlogDetail = ({ blog }) => {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="400" />;
  }

  if (router.isFallback) {
    return (
    <PageLayout className="blog-detail-page">
        Loading...
    </PageLayout>
    )
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={blog.coverImage}
            author={blog.author}
            date={moment(blog.date).format("LLLL")}
          />
          <hr />
          <BlogContent content={blog.content} />
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return {
    props: { blog },
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;
