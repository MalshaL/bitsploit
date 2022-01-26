import {Link} from "gatsby"
import React from "react"
import {Pagination} from "./pagination";

export default function PostList({posts, pageContext}) {
    return (
        <div className="postListContainer">
            <div className="postList">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <div className="postPreview" key={post.id}>
                                <Link to={post.frontmatter.path}>
                                    <div className="postPreviewImageDiv">
                                        <img className="postPreviewImage" src={post.frontmatter.image} alt=""/>
                                    </div>
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
                        )})}
            </div>
            <Pagination
                pageCount={pageContext.pageCount}
                currentPage={pageContext.currentPage}>
            </Pagination>
        </div>
    )
}