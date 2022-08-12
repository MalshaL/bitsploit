import {Link} from "gatsby"
import React from "react"
import {Pagination} from "./pagination";
import {Col, Row} from "antd";

export default function PostList({posts, pageContext}) {
    return (
        <div className="postListContainer">

            <div className="postList">
                <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 24, sm: 24, md: 24, lg: 32}]}>
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="postPreview" key={post.id}>
                                <Link to={post.frontmatter.path}>
                                    <img className="postPreviewImage" src={post.frontmatter.image} alt="Post Image"/>
                                    <div className="postPreviewContent">
                                        <Link to={post.frontmatter.path}
                                              className={'postPreviewTitle'}>{post.frontmatter.title}</Link>
                                        <p className={'postPreviewDate'}>{post.frontmatter.date}</p>
                                        {post.frontmatter.tags.map(tag => (
                                            <div className={'postPreviewTag'} key={tag}>{tag}</div>
                                        ))}
                                        <p className="postPreviewExcerpt">{post.frontmatter.excerpt}</p>
                                    </div></Link>
                            </div>
                            </Col>
                        )})}

            </Row>
            </div>
            <Pagination
                pageCount={pageContext.pageCount}
                currentPage={pageContext.currentPage}>
            </Pagination>
        </div>
    )
}